import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';
import '@testing-library/jest-dom';

describe('InputField', () => {
  test('renders with label', () => {
    render(<InputField label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('displays helper text', () => {
    render(<InputField helperText="Helpful text" />);
    expect(screen.getByText('Helpful text')).toBeInTheDocument();
  });

  test('shows error message when invalid', () => {
    render(<InputField invalid errorMessage="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  test('disables input when disabled prop is true', () => {
    render(<InputField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('handles onChange events', () => {
    const handleChange = jest.fn();
    render(<InputField onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('shows loading spinner when loading', () => {
    render(<InputField loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(<InputField isPassword type="password" />);
    const input = screen.getByRole('textbox');
    const toggleButton = screen.getByLabelText('Show password');
    
    // Initially should be password type
    expect(input).toHaveAttribute('type', 'password');
    
    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
    
    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('clears input when clear button is clicked', () => {
    const handleChange = jest.fn();
    render(<InputField value="test" onChange={handleChange} showClearButton />);
    
    const clearButton = screen.getByLabelText('Clear input');
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '',
        }),
      })
    );
  });

  test('applies correct classes for different variants', () => {
    const { rerender } = render(<InputField variant="outlined" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-gray-300');
    
    rerender(<InputField variant="filled" />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-gray-100');
    
    rerender(<InputField variant="ghost" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-b-2');
  });

  test('applies correct classes for different sizes', () => {
    const { rerender } = render(<InputField size="sm" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-8', 'text-sm');
    
    rerender(<InputField size="md" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-10', 'text-base');
    
    rerender(<InputField size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-12', 'text-lg');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<InputField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('renders with custom className', () => {
    render(<InputField className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
});
