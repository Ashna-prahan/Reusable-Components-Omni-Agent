import type { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import type { FormFieldConfig } from '../types/form.types';

// Validation logic separated from component for React refresh optimization
export function createValidationSchema<T extends FieldValues>(fields: FormFieldConfig<T>[]) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const validator = field.required 
      ? z.string().min(1, `${field.label} is required`)
      : z.string().optional();

    schemaFields[field.name as string] = validator;
  });

  return z.object(schemaFields);
}