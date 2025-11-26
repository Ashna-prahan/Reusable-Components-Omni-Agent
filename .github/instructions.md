# Omni Agent Reusable Form Components

## 📋 Overview

This project contains a library of reusable, self-contained form components that can be easily integrated into any React project. The components are built with React Hook Form, Zod validation, and TypeScript for maximum type safety and developer experience.

## 🏗️ Clean Project Structure

```
Reusable-Form(Omni-Agent Components)/
├── src/                          # 🧪 DEMO & TESTING ONLY
│   ├── App.tsx                   # Demo application showing form components
│   ├── index.css                 # Demo styling (imports from lib)
│   ├── main.tsx                  # React entry point
│   └── assets/                   # Demo assets
├── lib/                          # 📦 EXPORTABLE LIBRARY (COPY THIS!)
│   ├── components/               # ✨ Core form components
│   │   ├── fields/               # Individual field components
│   │   │   ├── TextField.tsx     # Text inputs, email, password, textarea
│   │   │   ├── SelectField.tsx   # Dropdown with search
│   │   │   ├── DateField.tsx     # Date/time inputs
│   │   │   ├── FileField.tsx     # File upload with drag & drop
│   │   │   ├── CheckboxField.tsx # Boolean inputs
│   │   │   └── RadioField.tsx    # Radio button groups
│   │   └── forms/                # Form containers & layouts
│   │       ├── DynamicForm.tsx   # Main configurable form
│   │       └── FormLayout.tsx    # Layout wrapper
│   ├── types/                    # 📝 TypeScript definitions
│   │   └── form.types.ts         # All form component interfaces
│   ├── validation/               # ✅ Validation schemas
│   │   └── schemas.ts            # Zod validation rules & examples
│   ├── styles/                   # 🎨 Framework-agnostic CSS
│   │   └── form-components.css   # Complete component styles
│   ├── index.ts                  # 🚪 Main export (import this!)
│   └── package.json              # Library configuration
├── integration-test.js           # 🔧 Integration test script
├── package.json                  # Development environment
└── .github/
    └── instructions.md           # This file
```

### 🎯 What to Copy to Your Main Project

**ONLY copy the `lib/` folder** - everything else is for development/testing.

## 🚀 Development & Testing

### Local Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` to see the interactive demo with all form components.

## 📦 Integration into Main Project

### Method 1: Copy Library Folder (Recommended)

1. **Copy the entire `lib` folder** to your main project:
   ```
   your-main-project/
   ├── src/
   ├── lib/                    # 👈 Copy this entire folder
   └── package.json
   ```

2. **Install required dependencies** in your main project:
   ```bash
   npm install react-hook-form @hookform/resolvers zod clsx
   ```

3. **Import components in your main project**:
   ```tsx
   // Import components
   import { DynamicForm, TextField, SelectField } from './lib';
   
   // Import CSS (choose one method):
   // Option A: Import directly
   import './lib/styles/form-components.css';
   
   // Option B: Copy CSS to your existing stylesheet
   // Copy contents of lib/styles/form-components.css
   ```

### Method 2: NPM Package (Advanced)

If you want to publish as an internal package:

1. **Navigate to lib folder**:
   ```bash
   cd lib
   ```

2. **Publish to private registry** (if you have one):
   ```bash
   npm publish --registry your-registry
   ```

3. **Install in main project**:
   ```bash
   npm install @omni-agent/form-components
   ```

## 💡 Usage Examples

### Basic Form Example

```tsx
import { DynamicForm, createFormConfig } from './lib';
import './lib/styles/form-components.css';

const ContactForm = () => {
  const fields = createFormConfig([
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
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

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <DynamicForm
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Send Message"
      layout="vertical"
    />
  );
};
```

### Individual Components

```tsx
import { TextField, SelectField, CheckboxField } from './lib';
import { useForm } from 'react-hook-form';

const CustomForm = () => {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        name="username"
        label="Username"
        control={control}
        required
      />
      
      <SelectField
        name="category"
        label="Category"
        control={control}
        options={[
          { value: 'tech', label: 'Technology' },
          { value: 'design', label: 'Design' },
        ]}
      />
      
      <CheckboxField
        name="subscribe"
        label="Subscribe to newsletter"
        control={control}
      />
    </form>
  );
};
```

## 🎨 Styling Options

### Option 1: Use Included CSS

Copy `lib/styles/form-components.css` and import it:

```tsx
import './lib/styles/form-components.css';
```

### Option 2: Tailwind CSS Integration

If your main project uses Tailwind CSS, update the component classes:

```tsx
// Example: Update form-input class in your CSS
.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500;
}
```

### Option 3: Custom Styling

Override CSS classes with your design system:

```css
/* In your main project's CSS */
.form-input {
  /* Your custom styles */
}

.form-button {
  /* Your custom button styles */
}
```

## 🔧 Available Components

### Form Components

| Component | Description | Props |
|-----------|-------------|-------|
| `DynamicForm` | Main form component with configurable fields | `fields`, `onSubmit`, `layout`, `validationSchema` |
| `FormLayout` | Flexible layout wrapper | `layout`, `gridCols`, `className` |

### Field Components

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `TextField` | Text inputs, email, password, textarea | `type`, `multiline`, `maxLength` |
| `SelectField` | Dropdown selection | `options`, `multiple`, `searchable` |
| `DateField` | Date, time, datetime inputs | `type`, `min`, `max` |
| `FileField` | File upload with drag & drop | `accept`, `multiple`, `maxSize` |
| `CheckboxField` | Boolean checkbox | `description` |
| `RadioField` | Radio button group | `options`, `inline` |

### Layout Options

- **Vertical**: Stacked form fields (default)
- **Horizontal**: Side-by-side layout 
- **Grid**: Responsive grid with customizable columns

## ✅ Validation

The library includes comprehensive validation using Zod:

```tsx
import { exampleSchemas } from './lib/validation/schemas';

<DynamicForm
  fields={fields}
  validationSchema={exampleSchemas.contact}
  onSubmit={handleSubmit}
/>
```

### Custom Validation

```tsx
import { z } from 'zod';

const customSchema = z.object({
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18+'),
});
```

## 🔄 Updating Components

### For Development Team

1. **Make changes** in the `src/` folder for testing
2. **Copy updates** to `lib/` folder when ready
3. **Test integration** in main project
4. **Commit changes** to version control

### Sync Command

```bash
# Copy updated components from src to lib
Copy-Item "src/components/fields/*" "lib/components/fields/" -Recurse -Force
Copy-Item "src/components/forms/*" "lib/components/forms/" -Recurse -Force
Copy-Item "src/types/*" "lib/types/" -Recurse -Force
Copy-Item "src/validation/*" "lib/validation/" -Recurse -Force
```

## 🚨 Important Notes

### Dependencies

The main project must have these dependencies:

```json
{
  "dependencies": {
    "react-hook-form": "^7.66.1",
    "@hookform/resolvers": "^5.2.2", 
    "zod": "^4.1.13",
    "clsx": "^2.1.1"
  }
}
```

### TypeScript Configuration

Ensure your main project's `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### CSS Framework Compatibility

- ✅ **Vanilla CSS**: Use included CSS file
- ✅ **Tailwind CSS**: Compatible with utility classes
- ✅ **Styled Components**: Override component styles
- ✅ **CSS Modules**: Rename classes as needed

## 🔧 Troubleshooting

### Common Issues

1. **Import errors**: Check that all dependencies are installed in main project
2. **Style issues**: Ensure CSS is imported or custom styles are applied
3. **Type errors**: Verify TypeScript configuration matches requirements

### Testing Integration

Before full integration, test with a simple component:

```tsx
import { TextField } from './lib';

const TestComponent = () => (
  <div>
    <TextField name="test" label="Test Field" control={control} />
  </div>
);
```

## 📞 Support

For questions or issues with form components:

1. Check this documentation
2. Review the demo application in `src/App.tsx`
3. Test components in the development server
4. Contact the development team

---

**Ready for seamless integration into your main project!** 🎉