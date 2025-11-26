# Reusable Form Components

A comprehensive library of reusable, dynamic form components built with React, TypeScript, React Hook Form, and Zod validation.

## 🚀 Features

- **Dynamic Form Fields**: Text, Select, Date, File, Checkbox, and Radio components
- **Centralized Validation**: Zod schemas with custom validation rules
- **Clean UI**: Responsive design with Tailwind CSS
- **Type Safety**: Full TypeScript support with IntelliSense
- **Accessibility**: ARIA labels, error announcements, keyboard navigation
- **Flexible Layouts**: Vertical, horizontal, and grid layout options
- **Easy Integration**: Self-contained components ready for any project

## 📦 Dependencies

### Core Dependencies
- `react` - UI library
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `clsx` - Conditional CSS classes
- `tailwindcss` - Styling framework
- `@tailwindcss/forms` - Enhanced form styling

### Dev Dependencies
- `typescript` - Type safety
- `vite` - Build tool
- `@vitejs/plugin-react` - React support for Vite

## 🏗️ Project Structure

```
src/
├── components/
│   ├── fields/           # Individual field components
│   │   ├── TextField.tsx
│   │   ├── SelectField.tsx
│   │   ├── DateField.tsx
│   │   ├── FileField.tsx
│   │   ├── CheckboxField.tsx
│   │   └── RadioField.tsx
│   ├── forms/            # Form layout and dynamic form
│   │   ├── FormLayout.tsx
│   │   └── DynamicForm.tsx
│   └── index.ts          # Component exports
├── types/
│   └── form.types.ts     # TypeScript interfaces
├── validation/
│   └── schemas.ts        # Zod validation schemas
├── App.tsx               # Demo application
└── index.css             # Tailwind CSS setup
```

## 🎯 Usage Examples

### Basic Dynamic Form

```tsx
import { DynamicForm, createFormConfig } from './components';

const formFields = createFormConfig([
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    required: true,
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    required: true,
    props: { type: 'email' },
  },
  {
    name: 'message',
    type: 'textarea',
    label: 'Message',
    props: { rows: 4 },
  },
]);

function MyForm() {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <DynamicForm
      fields={formFields}
      onSubmit={handleSubmit}
      layout="vertical"
    />
  );
}
```

## 🔧 Available Field Types

| Field Type | Description | Key Props |
|------------|-------------|-----------|
| `text` | Text input, email, password, etc. | `type`, `multiline`, `maxLength` |
| `select` | Dropdown selection | `options`, `multiple`, `searchable` |
| `date` | Date, time, datetime inputs | `type`, `min`, `max` |
| `file` | File upload with drag & drop | `accept`, `multiple`, `maxSize` |
| `checkbox` | Boolean checkbox | `description` |
| `radio` | Radio button group | `options`, `inline` |

## 🎨 Layout Options

- **Vertical**: Stacked form fields (default)
- **Horizontal**: Side-by-side layout for smaller forms
- **Grid**: Responsive grid layout with customizable columns

## ✅ Validation Features

- **Built-in Rules**: Required, email, phone, URL validation
- **File Validation**: File type, size, and count restrictions  
- **Date Validation**: Past/future date checks, date ranges
- **Custom Rules**: Conditional validation, password confirmation
- **Real-time Feedback**: Validation on change with error messages

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔄 Export for Other Projects

This library is designed to be easily exported to other projects:

1. **Copy Components**: Copy the `src/components`, `src/types`, and `src/validation` folders
2. **Install Dependencies**: Ensure target project has required dependencies
3. **Import Styles**: Include Tailwind CSS or adapt the styling
4. **Use Components**: Import and use components as shown in examples

## 🤝 Integration Guidelines

- Components are self-contained with minimal external dependencies
- TypeScript interfaces ensure type safety across projects
- Tailwind CSS classes can be customized or replaced
- Validation schemas are modular and extendable
- Form layouts adapt to different design systems

---

**Ready to integrate into your projects!** 🎉

This form component library provides everything needed for dynamic, validated forms across multiple applications.
```
