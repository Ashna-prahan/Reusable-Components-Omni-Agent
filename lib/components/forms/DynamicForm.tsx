import { useForm } from 'react-hook-form';
import type { FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DynamicFormProps, FormFieldConfig } from '../../types/form.types';
import { FormLayout } from './FormLayout';
import { TextField } from '../fields/TextField';
import { SelectField } from '../fields/SelectField';
import { DateField } from '../fields/DateField';
import { FileField } from '../fields/FileField';
import { CheckboxField } from '../fields/CheckboxField';
import { RadioField } from '../fields/RadioField';
import { clsx } from 'clsx';

export function DynamicForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues,
  submitLabel = 'Submit',
  loading = false,
  className,
  layout = 'vertical',
  gridCols = 2,
  children,
  validationSchema,
}: DynamicFormProps<T> & { validationSchema?: unknown }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: validationSchema ? zodResolver(validationSchema as any) : undefined, // eslint-disable-line @typescript-eslint/no-explicit-any
    mode: 'onChange',
  });

  const renderField = (field: FormFieldConfig<T>) => {
    const baseProps = {
      key: field.name,
      name: field.name,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      control,
      error: errors[field.name]?.message as string,
      ...field.props,
    };

    switch (field.type) {
      case 'text':
        return <TextField {...baseProps} />;
      case 'textarea':
        return <TextField {...baseProps} multiline />;
      case 'select':
        return <SelectField {...baseProps} options={(field.props?.options as any) || []} />; // eslint-disable-line @typescript-eslint/no-explicit-any
      case 'date':
        return <DateField {...baseProps} />;
      case 'file':
        return <FileField {...baseProps} />;
      case 'checkbox':
        return <CheckboxField {...baseProps} />;
      case 'radio':
        return <RadioField {...baseProps} options={(field.props?.options as any) || []} />; // eslint-disable-line @typescript-eslint/no-explicit-any
      default:
        console.warn(`Unknown field type: ${field.type}`);
        return null;
    }
  };

  const onSubmitHandler = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const formClasses = clsx(
    'w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200',
    className
  );

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={formClasses} noValidate>
      <FormLayout layout={layout} gridCols={gridCols}>
        {fields.map(renderField)}
      </FormLayout>

      {children}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={clsx(
              'px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed',
              {
                'bg-gray-400 hover:bg-gray-400': loading || isSubmitting || !isValid,
              }
            )}
            disabled={loading || isSubmitting}
          >
            {loading || isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </div>
    </form>
  );
}