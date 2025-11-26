import type { ReactNode } from 'react';
import type { FieldValues, Path, RegisterOptions, Control } from 'react-hook-form';

export interface BaseFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  helperText?: string;
  control: Control<T>;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface TextFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export interface SelectFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
}

export interface DateFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  type?: 'date' | 'datetime-local' | 'time';
  min?: string;
  max?: string;
}

export interface FileFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
}

export interface CheckboxFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  description?: string;
}

export interface RadioFieldProps<T extends FieldValues> extends BaseFieldProps<T> {
  options: SelectOption[];
  inline?: boolean;
}

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  type: 'text' | 'select' | 'date' | 'file' | 'checkbox' | 'radio' | 'textarea';
  label?: string;
  placeholder?: string;
  required?: boolean;
  validation?: RegisterOptions<T>;
  props?: Record<string, unknown>;
}

export interface DynamicFormProps<T extends FieldValues> {
  fields: FormFieldConfig<T>[];
  onSubmit: (data: T) => void | Promise<void>;
  defaultValues?: Partial<T>;
  submitLabel?: string;
  loading?: boolean;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridCols?: number;
  children?: ReactNode;
}

export interface FormLayoutProps {
  children: ReactNode;
  layout?: 'vertical' | 'horizontal' | 'grid';
  gridCols?: number;
  className?: string;
}