import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { RadioFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function RadioField<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  options,
  inline = false,
  ...props
}: RadioFieldProps<T>) {
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
  const fieldsetId = `${name}-radio-group`;

  const radioClasses = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300';
  const containerClasses = clsx(
    'space-y-2',
    {
      'flex flex-wrap gap-4': inline,
      'space-y-0': inline,
    }
  );

  return (
    <fieldset className={clsx('form-field', className)} aria-describedby={displayError ? `${fieldsetId}-error` : helperText ? `${fieldsetId}-help` : undefined}>
      {label && (
        <legend className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      
      <div className={containerClasses}>
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          return (
            <div key={option.value} className="flex items-center">
              <input
                {...field}
                id={optionId}
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                disabled={disabled || option.disabled}
                className={radioClasses}
                aria-invalid={!!displayError}
              />
              <label 
                htmlFor={optionId} 
                className={clsx(
                  'ml-3 text-sm font-medium cursor-pointer',
                  {
                    'text-gray-700': !disabled && !option.disabled,
                    'text-gray-400 cursor-not-allowed': disabled || option.disabled,
                  }
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {displayError && (
        <p id={`${fieldsetId}-error`} className="form-error" role="alert">
          {displayError}
        </p>
      )}

      {helperText && !displayError && (
        <p id={`${fieldsetId}-help`} className="text-gray-500 text-sm mt-1">
          {helperText}
        </p>
      )}
    </fieldset>
  );
}