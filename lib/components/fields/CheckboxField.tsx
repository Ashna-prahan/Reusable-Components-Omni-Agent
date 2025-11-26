import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { CheckboxFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function CheckboxField<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  description,
  ...props
}: CheckboxFieldProps<T>) {
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
  const inputId = `${name}-checkbox`;

  const checkboxClasses = clsx(
    'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded',
    {
      'border-red-500': displayError,
      'opacity-50 cursor-not-allowed': disabled,
    }
  );

  return (
    <div className={clsx('form-field', className)}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            {...field}
            id={inputId}
            type="checkbox"
            checked={field.value || false}
            disabled={disabled}
            className={checkboxClasses}
            aria-invalid={!!displayError}
            aria-describedby={displayError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={inputId} className="font-medium text-gray-700 cursor-pointer">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {description && (
            <p className="text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>

      {displayError && (
        <p id={`${inputId}-error`} className="form-error ml-7" role="alert">
          {displayError}
        </p>
      )}

      {helperText && !displayError && (
        <p id={`${inputId}-help`} className="text-gray-500 text-sm mt-1 ml-7">
          {helperText}
        </p>
      )}
    </div>
  );
}