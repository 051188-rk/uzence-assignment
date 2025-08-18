import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import { Icon } from '../ui/Icon';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    isPassword: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text here...',
    variant: 'outlined',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    helperText: 'This is a helper text',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <InputField variant="outlined" label="Outlined" placeholder="Outlined input" />
      <InputField variant="filled" label="Filled" placeholder="Filled input" />
      <InputField variant="ghost" label="Ghost" placeholder="Ghost input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <InputField size="sm" label="Small" placeholder="Small input" />
      <InputField size="md" label="Medium" placeholder="Medium input" />
      <InputField size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
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
