import { z } from 'zod';

// Common validation schemas
export const commonValidation = {
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  phone: z.string().regex(/^[+]?[1-9]\d{0,15}$/, 'Please enter a valid phone number'),
  url: z.string().url('Please enter a valid URL'),
  required: z.string().min(1, 'This field is required'),
  optionalString: z.string().optional(),
};

// File validation
export const fileValidation = {
  image: z.instanceof(File).refine(
    (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only JPEG, PNG, and WebP images are allowed'
  ),
  document: z.instanceof(File).refine(
    (file) => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type),
    'Only PDF and Word documents are allowed'
  ),
  maxFileSize: (maxSize: number) => z.instanceof(File).refine(
    (file) => file.size <= maxSize,
    `File size must be less than ${maxSize / 1024 / 1024}MB`
  ),
};

// Date validation
export const dateValidation = {
  futureDate: z.string().refine(
    (date) => new Date(date) > new Date(),
    'Date must be in the future'
  ),
  pastDate: z.string().refine(
    (date) => new Date(date) < new Date(),
    'Date must be in the past'
  ),
  dateRange: (minDate?: string, maxDate?: string) => {
    let schema = z.string();
    if (minDate) {
      schema = schema.refine(
        (date) => new Date(date) >= new Date(minDate),
        `Date must be after ${minDate}`
      );
    }
    if (maxDate) {
      schema = schema.refine(
        (date) => new Date(date) <= new Date(maxDate),
        `Date must be before ${maxDate}`
      );
    }
    return schema;
  },
};

// Number validation
export const numberValidation = {
  positive: z.number().positive('Must be a positive number'),
  nonNegative: z.number().min(0, 'Must be zero or positive'),
  range: (min?: number, max?: number) => {
    let schema = z.number();
    if (min !== undefined) {
      schema = schema.min(min, `Must be at least ${min}`);
    }
    if (max !== undefined) {
      schema = schema.max(max, `Must be at most ${max}`);
    }
    return schema;
  },
};

// Custom validation helpers
export const customValidation = {
  confirmPassword: () => z.string(),
  
  uniqueArray: (message = 'Values must be unique') => z.array(z.any()).refine(
    (arr) => new Set(arr).size === arr.length,
    message
  ),
  
  conditionalRequired: (_condition: (data: unknown) => boolean, message = 'This field is required') => z.string().min(1, message),
};

// Example form schemas
export const exampleSchemas = {
  contact: z.object({
    name: commonValidation.required,
    email: commonValidation.email,
    phone: commonValidation.phone.optional(),
    message: z.string().min(10, 'Message must be at least 10 characters long'),
  }),
  
  user: z.object({
    firstName: commonValidation.required,
    lastName: commonValidation.required,
    email: commonValidation.email,
    password: commonValidation.password,
    confirmPassword: commonValidation.required,
    birthDate: dateValidation.pastDate,
    avatar: fileValidation.image.optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
  
  product: z.object({
    name: commonValidation.required,
    description: z.string().optional(),
    price: numberValidation.positive,
    category: commonValidation.required,
    inStock: z.boolean(),
    images: z.array(fileValidation.image).min(1, 'At least one image is required'),
  }),
};