import { useRef, useState } from 'react';
import { useController } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import type { FileFieldProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function FileField<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  className,
  error,
  helperText,
  accept,
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  ...props
}: FileFieldProps<T>) {
  const {
    field: { onChange, value, ...fieldProps },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control: props.control,
    rules: {
      required: required ? 'This field is required' : false,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const displayError = error || fieldError?.message;
  const inputId = `${name}-file`;

  const selectedFiles = value as FileList | File[] | null;
  const fileCount = selectedFiles ? (selectedFiles instanceof FileList ? selectedFiles.length : selectedFiles.length) : 0;

  const validateFiles = (files: FileList | null) => {
    if (!files) return null;

    const fileArray = Array.from(files);
    
    // Check file count
    if (fileArray.length > maxFiles) {
      return `Maximum ${maxFiles} file(s) allowed`;
    }

    // Check file sizes
    for (const file of fileArray) {
      if (file.size > maxSize) {
        return `File "${file.name}" is too large. Maximum size: ${maxSize / 1024 / 1024}MB`;
      }
    }

    return null;
  };

  const handleFileChange = (files: FileList | null) => {
    const validationError = validateFiles(files);
    if (validationError) {
      // Handle validation error
      return;
    }

    if (multiple) {
      onChange(files ? Array.from(files) : []);
    } else {
      onChange(files ? files[0] : null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    if (multiple && Array.isArray(selectedFiles)) {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      onChange(newFiles);
    } else {
      onChange(null);
    }
  };

  const dropZoneClasses = clsx(
    'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
    {
      'border-blue-400 bg-blue-50': dragActive,
      'border-gray-300 hover:border-gray-400': !dragActive && !disabled,
      'border-red-300 bg-red-50': displayError,
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
      
      <div
        className={dropZoneClasses}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          {...fieldProps}
          ref={fileInputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined}
        />
        
        <div className="space-y-2">
          <div className="text-gray-600">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-sm text-gray-600">
            {fileCount > 0 ? (
              <span className="font-medium text-blue-600">
                {fileCount} file(s) selected
              </span>
            ) : (
              <>
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Click to upload
                </span>{' '}
                or drag and drop
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {accept && <div>Accepted: {accept}</div>}
            <div>Max size: {maxSize / 1024 / 1024}MB</div>
            {multiple && <div>Max files: {maxFiles}</div>}
          </div>
        </div>
      </div>

      {/* File list */}
      {selectedFiles && fileCount > 0 && (
        <div className="mt-2 space-y-1">
          {(multiple ? (selectedFiles as File[]) : [(selectedFiles as unknown as File)]).map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-red-600 hover:text-red-800 ml-2"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

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