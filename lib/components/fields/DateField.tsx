import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { DateFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function DateField<T extends FieldValues>({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  type = 'date',
  min,
  max,
  ...props
}: DateFieldProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control: props.control,
    rules: {
      required: required ? 'This field is required' : false,
    },
  });

  const displayError = error || fieldError?.message;
  const inputId = `${name}-date`;

  const inputClasses = clsx(
    'form-input',
    {
      'border-red-500 focus:border-red-500 focus:ring-red-500': displayError,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        {...field}
        id={inputId}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
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
    </div>
  );
}