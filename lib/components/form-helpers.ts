import type { FieldValues } from 'react-hook-form';
import type { FormFieldConfig } from '../types/form.types';

// Helper function to create form field configurations
export function createFormField<T extends FieldValues>(config: FormFieldConfig<T>): FormFieldConfig<T> {
  return config;
}

// Helper function to create form configurations
export function createFormConfig<T extends FieldValues>(fields: FormFieldConfig<T>[]) {
  return fields;
}