#!/usr/bin/env node

/**
 * Integration Test Script for Omni Agent Form Components
 * 
 * This script helps test the integration of form components into your main project.
 * 
 * Usage:
 * 1. Copy this script to your main project root
 * 2. Run: node integration-test.js
 * 3. Follow the prompts to test different integration scenarios
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Omni Agent Form Components Integration Test');
console.log('='.repeat(50));

// Check if lib folder exists
const libPath = path.join(__dirname, 'lib');
if (!fs.existsSync(libPath)) {
  console.error('❌ Error: lib folder not found!');
  console.log('📝 Instructions:');
  console.log('1. Copy the entire "lib" folder from the form components project');
  console.log('2. Place it in your main project root directory');
  console.log('3. Run this test again');
  process.exit(1);
}

console.log('✅ lib folder found');

// Check required dependencies
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson = {};

try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
  process.exit(1);
}

const requiredDeps = [
  'react-hook-form',
  '@hookform/resolvers',
  'zod',
  'clsx'
];

const missingDeps = requiredDeps.filter(dep => 
  !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
);

if (missingDeps.length > 0) {
  console.log('⚠️  Missing required dependencies:');
  missingDeps.forEach(dep => console.log(`   - ${dep}`));
  console.log('');
  console.log('📝 Run this command to install:');
  console.log(`   npm install ${missingDeps.join(' ')}`);
  console.log('');
} else {
  console.log('✅ All required dependencies found');
}

// Check if lib components are properly structured
const requiredFiles = [
  'lib/index.ts',
  'lib/components/forms/DynamicForm.tsx',
  'lib/components/fields/TextField.tsx',
  'lib/styles/form-components.css',
  'lib/types/form.types.ts',
  'lib/validation/schemas.ts'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('');
  console.log('❌ Some required files are missing from lib folder');
  console.log('📝 Please copy the complete lib folder from form components project');
  process.exit(1);
}

// Create test component file
const testComponentContent = `
// Test Component for Form Integration
// This file is auto-generated for testing - you can delete it after testing

import React from 'react';
import { DynamicForm, createFormConfig } from './lib';
import { useForm } from 'react-hook-form';
// Import CSS - uncomment the line below
// import './lib/styles/form-components.css';

const TestForm = () => {
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
      label: 'Email',
      required: true,
      props: { type: 'email' },
    },
  ]);

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console for data.');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Form Integration Test</h2>
      <DynamicForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Test Submit"
      />
    </div>
  );
};

export default TestForm;
`;

fs.writeFileSync(path.join(__dirname, 'FormIntegrationTest.tsx'), testComponentContent);

console.log('');
console.log('🎉 Integration test setup complete!');
console.log('');
console.log('📝 Next steps:');
console.log('1. Import and use FormIntegrationTest.tsx in your app');
console.log('2. Uncomment the CSS import line in the test file');
console.log('3. Test the form functionality');
console.log('4. Delete FormIntegrationTest.tsx when done testing');
console.log('');
console.log('💡 Example usage in your App component:');
console.log('   import TestForm from "./FormIntegrationTest";');
console.log('   // Add <TestForm /> to your JSX');
console.log('');
console.log('🔗 For full documentation, see: .github/instructions.md');