import { useState } from 'react';
import { DynamicForm, createFormConfig } from '../lib';
import { exampleSchemas } from '../lib/validation/schemas';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  contactMethod: 'email' | 'phone';
  newsletter: boolean;
  preferredTime: string;
  attachments: File[];
}

function App() {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define form fields configuration
  const contactFormFields = createFormConfig<ContactFormData>([
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      props: { type: 'email' },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      props: { type: 'tel' },
    },
    {
      name: 'contactMethod',
      type: 'radio',
      label: 'Preferred Contact Method',
      required: true,
      props: {
        options: [
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
        ],
        inline: true,
      },
    },
    {
      name: 'preferredTime',
      type: 'date',
      label: 'Preferred Contact Date',
      props: { type: 'datetime-local' },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Tell us how we can help you...',
      required: true,
      props: { rows: 4, maxLength: 500 },
    },
    {
      name: 'attachments',
      type: 'file',
      label: 'Attachments',
      props: {
        multiple: true,
        accept: '.pdf,.doc,.docx,.txt',
        maxFiles: 3,
        maxSize: 2 * 1024 * 1024, // 2MB
      },
    },
    {
      name: 'newsletter',
      type: 'checkbox',
      label: 'Subscribe to Newsletter',
      props: {
        description: 'Get updates about new features and special offers',
      },
    },
  ]);

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsLoading(false);
    
    // Show success message
    alert('Form submitted successfully!');
  };

  return (
    <div className="demo-container">
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <header className="demo-header">
          <h1 className="demo-title">
            Reusable Form Components
          </h1>
          <p className="demo-subtitle">
            Dynamic, validated, and responsive form components built with React Hook Form
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Contact Form Example */}
          <section className="demo-section">
            <h2 className="demo-section-title">
              Contact Form Example
            </h2>
            <DynamicForm
              fields={contactFormFields}
              onSubmit={handleSubmit}
              loading={isLoading}
              submitLabel="Send Message"
              layout="grid"
              gridCols={2}
              validationSchema={exampleSchemas.contact}
              defaultValues={{
                contactMethod: 'email',
                newsletter: false,
              }}
            />
          </section>

          {/* Form Features */}
          <section className="demo-section" style={{ background: 'white', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
            <h2 className="demo-section-title">
              Features Showcase
            </h2>
            <div className="feature-grid">
              <div className="feature-card" style={{ backgroundColor: '#dbeafe' }}>
                <h3 style={{ color: '#1e3a8a' }}>Dynamic Fields</h3>
                <p>
                  Text, Select, Date, File, Checkbox, and Radio field components
                </p>
              </div>
              <div className="feature-card" style={{ backgroundColor: '#dcfce7' }}>
                <h3 style={{ color: '#14532d' }}>Validation</h3>
                <p>
                  Centralized validation with Zod schemas and custom rules
                </p>
              </div>
              <div className="feature-card" style={{ backgroundColor: '#f3e8ff' }}>
                <h3 style={{ color: '#581c87' }}>Responsive</h3>
                <p>
                  Clean, mobile-first design with framework-agnostic CSS
                </p>
              </div>
              <div className="feature-card" style={{ backgroundColor: '#fef3c7' }}>
                <h3 style={{ color: '#92400e' }}>Layouts</h3>
                <p>
                  Vertical, horizontal, and grid layout options
                </p>
              </div>
              <div className="feature-card" style={{ backgroundColor: '#fee2e2' }}>
                <h3 style={{ color: '#991b1b' }}>Accessibility</h3>
                <p>
                  ARIA labels, error announcements, and keyboard navigation
                </p>
              </div>
              <div className="feature-card">
                <h3>TypeScript</h3>
                <p>
                  Full type safety and IntelliSense support
                </p>
              </div>
            </div>
          </section>

          {/* Submitted Data Display */}
          {submittedData && (
            <section className="success-message">
              <h2 className="success-title">
                ✅ Form Submitted Successfully
              </h2>
              <pre className="code-block">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
