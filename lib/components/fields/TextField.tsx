import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { TextFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function TextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  type = 'text',
  multiline = false,
  rows = 3,
  maxLength,
  ...props
}: TextFieldProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control: props.control,
    rules: {
      required: required ? 'This field is required' : false,
      maxLength: maxLength ? {
        value: maxLength,
        message: `Maximum ${maxLength} characters allowed`
      } : undefined,
    },
  });

  const displayError = error || fieldError?.message;
  const inputId = `${name}-input`;

  const inputClasses = clsx(
    'form-input',
    {
      'form-input-error': displayError,
      'form-input-disabled': disabled,
    },
    className
  );

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <InputComponent
        {...field}
        id={inputId}
        type={multiline ? undefined : type}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        rows={multiline ? rows : undefined}
        className={inputClasses}
        aria-invalid={!!displayError}
        aria-describedby={displayError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
      />

      {displayError && (
        <p id={`${inputId}-error`} className="form-error" role="alert">
          {displayError}
        </p>
      )}

      {helperText && !displayError && (
        <p id={`${inputId}-help`} className="text-gray-500 text-sm mt-1">
          {helperText}
        </p>
      )}

      {maxLength && (
        <div className="text-right text-xs text-gray-400 mt-1">
          {field.value?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
}