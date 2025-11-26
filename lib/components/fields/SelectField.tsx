import { useState } from 'react';
import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { SelectFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function SelectField<T extends FieldValues>({
  name,
  label,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  options,
  multiple = false,
  searchable = false,
  ...props
}: SelectFieldProps<T>) {
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

  const [searchTerm, setSearchTerm] = useState('');
  const displayError = error || fieldError?.message;
  const inputId = `${name}-select`;

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectClasses = clsx(
    'form-input',
    {
      'border-red-500 focus:border-red-500 focus:ring-red-500': displayError,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  if (searchable) {
    return (
      <div className="form-field">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={selectClasses}
            disabled={disabled}
          />
          
          {filteredOptions.length > 0 && searchTerm && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={option.disabled}
                  onClick={() => {
                    field.onChange(option.value);
                    setSearchTerm(option.label);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

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

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        {...field}
        id={inputId}
        multiple={multiple}
        disabled={disabled}
        className={selectClasses}
        aria-invalid={!!displayError}
        aria-describedby={displayError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
      >
        {!multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

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