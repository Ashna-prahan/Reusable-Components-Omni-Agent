
import type { FormLayoutProps } from '../../types/form.types';
import { clsx } from 'clsx';

export function FormLayout({
  children,
  layout = 'vertical',
  gridCols = 2,
  className,
}: FormLayoutProps) {
  const layoutClasses = clsx(
    {
      'space-y-4': layout === 'vertical',
      'space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end': layout === 'horizontal',
      [`grid grid-cols-1 gap-4 md:grid-cols-${gridCols}`]: layout === 'grid',
    },
    className
  );

  return (
    <div className={layoutClasses}>
      {children}
    </div>
  );
}