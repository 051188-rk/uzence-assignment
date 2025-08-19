import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InputField } from './InputField';
import { Icon } from '../ui/Icon';
import React from 'react';

// Storybook decorator for better layout
const StoryContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
        {children}
      </div>
    </div>
  </div>
);

const meta: Meta<typeof InputField> = {
  title: 'Components/Input Field',
  component: InputField,
  tags: ['autodocs', 'input', 'form', 'ui'],
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input field component with multiple variants, sizes, and states. Supports icons, validation, and responsive design.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
      description: 'Visual style variant of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: { 
      control: 'boolean',
      description: 'Disables the input field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: { 
      control: 'boolean',
      description: 'Shows error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: { 
      control: 'boolean',
      description: 'Shows loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: { 
      control: 'boolean',
      description: 'Makes input take full width of container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showClearButton: { 
      control: 'boolean',
      description: 'Shows clear button when input has value',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isPassword: { 
      control: 'boolean',
      description: 'Adds password visibility toggle',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: { 
      control: 'text',
      description: 'Label text for the input field',
    },
    placeholder: { 
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: { 
      control: 'text',
      description: 'Helper text below the input',
    },
    errorMessage: { 
      control: 'text',
      description: 'Error message to display when invalid',
    },
  },
  args: {
    label: 'Input Label',
    placeholder: 'Enter text here...',
    variant: 'outlined',
    size: 'md',
    disabled: false,
    invalid: false,
    loading: false,
    fullWidth: false,
    showClearButton: false,
    isPassword: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Reusable section header component
const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
    {description && (
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    )}
  </div>
);

// Reusable example container
const ExampleContainer = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
      {children}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    label: 'Default Input',
    helperText: 'This is a helper text that provides additional context about the input field.',
  },
  decorators: [
    (Story) => (
      <div className="space-y-8">
        <SectionHeader 
          title="Default Input Field" 
          description="A standard input field with label and helper text." 
        />
        <div className="grid gap-6">
          <ExampleContainer title="Basic Example">
            <Story />
          </ExampleContainer>
          
          <ExampleContainer title="With Custom Styling">
            <InputField
              label="Custom Styled Input"
              placeholder="Type something..."
              className="border-2 border-blue-200 focus:border-blue-500 transition-colors"
              helperText="This input has custom border styling"
            />
          </ExampleContainer>
          
          <ExampleContainer title="With Icons">
            <div className="space-y-4">
              <InputField
                label="Search"
                placeholder="Search..."
                startIcon={
                  <Icon 
                    name="FiSearch" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" 
                  />
                }
                className="pl-10"
              />
              <InputField
                label="With Clear Button"
                placeholder="Type to see clear button"
                showClearButton
                helperText="Clear button appears when there's text"
              />
            </div>
          </ExampleContainer>
        </div>
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <SectionHeader 
        title="Input Variants" 
        description="Different visual styles for the input field to match various design needs." 
      />
      
      <div className="grid gap-8">
        <ExampleContainer title="Outlined (Default)">
          <div className="space-y-4">
            <InputField 
              variant="outlined" 
              label="Outlined Input" 
              placeholder="Type something..."
              helperText="Default style with a border"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Forms with multiple inputs</li>
                <li>Dense interfaces</li>
                <li>When you need clear visual boundaries</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>

        <ExampleContainer title="Filled">
          <div className="space-y-4">
            <InputField 
              variant="filled" 
              label="Filled Input" 
              placeholder="Type something..."
              helperText="Has a subtle background color"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Standalone inputs</li>
                <li>Search interfaces</li>
                <li>When you want a more modern look</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>

        <ExampleContainer title="Ghost">
          <div className="space-y-4">
            <InputField 
              variant="ghost" 
              label="Ghost Input" 
              placeholder="Type something..."
              helperText="Minimal style that appears on interaction"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Clean, minimalist interfaces</li>
                <li>Search bars in headers</li>
                <li>When you want the input to be less prominent</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for the input field. Each variant serves different use cases and visual hierarchies.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <SectionHeader 
        title="Input Sizes" 
        description="Different sizes for different contexts and use cases." 
      />
      
      <div className="space-y-8">
        <ExampleContainer title="Small (sm)">
          <div className="space-y-4">
            <InputField 
              size="sm" 
              label="Small Input" 
              placeholder="Enter text..."
              helperText="Compact size for dense interfaces"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Height: 32px</p>
              <p className="mt-1">Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Data-dense interfaces</li>
                <li>Tables and grids</li>
                <li>Secondary actions</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>

        <ExampleContainer title="Medium (md) - Default">
          <div className="space-y-4">
            <InputField 
              size="md" 
              label="Medium Input" 
              placeholder="Enter text..."
              helperText="Standard size for most forms"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Height: 40px</p>
              <p className="mt-1">Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Main form inputs</li>
                <li>General purpose inputs</li>
                <li>Balanced density and touch target size</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>

        <ExampleContainer title="Large (lg)">
          <div className="space-y-4">
            <InputField 
              size="lg" 
              label="Large Input" 
              placeholder="Enter text..."
              helperText="Larger touch target for better accessibility"
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Height: 48px</p>
              <p className="mt-1">Best for:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Mobile interfaces</li>
                <li>Accessibility-focused designs</li>
                <li>Primary call-to-action inputs</li>
              </ul>
            </div>
          </div>
        </ExampleContainer>

        <ExampleContainer title="Size Comparison">
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <InputField 
                size="sm" 
                label="Small" 
                placeholder="Small input"
                className="w-full"
              />
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <InputField 
                size="md" 
                label="Medium (Default)" 
                placeholder="Medium input"
                className="w-full"
              />
            </div>
            <div>
              <InputField 
                size="lg" 
                label="Large" 
                placeholder="Large input"
                className="w-full"
              />
            </div>
          </div>
        </ExampleContainer>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size options for the input field. Each size is designed for specific use cases and touch target requirements.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
            <InputField 
        label="Disabled" 
        placeholder="Disabled input" 
              disabled
        helperText="This input is disabled"
            />
            <InputField 
        label="Error State" 
        placeholder="With error" 
              invalid 
        errorMessage="This field is required"
      />
            <InputField 
        label="Loading State" 
        placeholder="Loading..." 
              loading
        helperText="Loading data..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states an input field can be in, providing appropriate feedback and guidance to users.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <InputField 
        label="With Left Icon" 
        placeholder="Search..."
        className="pl-10"
        startIcon={<Icon name="FiMail" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
      />
      <InputField 
        label="With Right Icon" 
        placeholder="Search..."
        className="pr-10"
        endIcon={<Icon name="FiMail" className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
      />
    </div>
  ),
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    isPassword: true,
    showClearButton: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes full width',
    fullWidth: true,
  },
};
