import React, { useState, forwardRef, ReactNode, useId } from 'react';
import { Icon } from '../ui/Icon';

export type InputVariant = 'filled' | 'outlined' | 'ghost';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text for the input field */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display when validation fails */
  errorMessage?: string;
  /** Whether the input is in an invalid state */
  invalid?: boolean;
  /** Visual variant of the input */
  variant?: InputVariant;
  /** Size of the input */
  size?: InputSize;
  /** Whether to show a clear button when the input has a value */
  showClearButton?: boolean;
  /** Whether this is a password input with toggle visibility */
  isPassword?: boolean;
  /** Show a loading spinner */
  loading?: boolean;
  /** Make the input take up the full width of its container */
  fullWidth?: boolean;
  /** Icon to display at the start of the input */
  startIcon?: ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: ReactNode;
  /** Additional class names for the container */
  containerClassName?: string;
  /** Whether the input is required */
  required?: boolean;
  /** Custom validation function */
  validate?: (value: string) => string | undefined;
  /** Callback when the input is cleared */
  onClear?: () => void;
}

// Size classes for different input sizes
const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
};

// Padding classes to account for icons
const paddingWithIcon = {
  sm: {
    left: 'pl-9',
    right: 'pr-9',
    both: 'px-9',
  },
  md: {
    left: 'pl-10',
    right: 'pr-10',
    both: 'px-10',
  },
  lg: {
    left: 'pl-11',
    right: 'pr-11',
    both: 'px-11',
  },
};

// Variant classes for different input styles
const variantClasses = {
  filled: 'bg-gray-100 dark:bg-gray-700 border-transparent focus:bg-white dark:focus:bg-gray-800',
  outlined: 'bg-transparent border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400',
  ghost: 'bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-none',
};

// Focus ring styles
const focusRing = 'focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50';

// Disabled state styles
const disabledStyles = 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800';

// Error state styles
const errorStyles = 'border-red-500 dark:border-red-400 text-red-900 dark:text-red-200 placeholder-red-300 dark:placeholder-red-700 focus:ring-red-500 focus:border-red-500';

// Base input styles
const baseInputStyles = 'w-full rounded-md transition-all duration-200 outline-none disabled:opacity-75';

// Label styles
const labelStyles = 'block text-sm font-medium mb-1.5';

// Helper text styles
const helperTextStyles = 'mt-1.5 text-xs';

// Error message styles
const errorMessageStyles = 'mt-1.5 text-sm text-red-600 dark:text-red-400';

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  {
    label,
    helperText,
    errorMessage,
    invalid = false,
    variant = 'outlined',
    size = 'md',
    disabled = false,
    loading = false,
    showClearButton = true,
    isPassword = false,
    fullWidth = false,
    className = '',
    containerClassName = '',
    required = false,
    validate,
    onClear,
    onChange,
    onFocus,
    onBlur,
    id: propId,
    value: propValue,
    ...props
  },
  ref
) => {
  // Generate a unique ID if one isn't provided - using useId at the top level
  const generatedId = useId();
  const id = propId || `input-${generatedId}`;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  
  // State for controlled components
  const [value, setValue] = useState<string>(propValue?.toString() || '');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(errorMessage);
  
  // Determine if the input is in an error state
  const hasError = invalid || !!localError || !!errorMessage;
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Run validation if provided
    if (validate) {
      const validationError = validate(newValue);
      setLocalError(validationError);
    }
    
    // Call the onChange prop if provided
    if (onChange) {
      onChange(e);
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Handle clear button click
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('');
    setLocalError(undefined);
    
    // Call the onClear prop if provided
    if (onClear) {
      onClear();
    }
    
    // Focus the input after clearing
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.focus();
    }
  };
  
  // Handle focus events
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  // Handle blur events
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Determine input type
  const inputType = isPassword && !showPassword ? 'password' : 'text';
  
  // Check if the clear button should be shown
  const isClearable = showClearButton && (value || value === '') && !disabled && !loading;
  
  // Determine if we have a start or end icon
  const hasStartIcon = !!props.startIcon;
  const hasEndIcon = !!props.endIcon || isClearable || isPassword || loading;
  
  // Build the input classes
  const inputClasses = [
    baseInputStyles,
    sizeClasses[size],
    variantClasses[variant],
    hasError ? errorStyles : '',
    disabled ? disabledStyles : '',
    hasStartIcon ? paddingWithIcon[size].left : 'pl-3',
    hasEndIcon ? paddingWithIcon[size].right : 'pr-3',
    isFocused && !hasError ? focusRing : '',
    className,
  ].filter(Boolean).join(' ');
  
  // Build the container classes
  const containerClasses = [
    'relative',
    fullWidth ? 'w-full' : 'w-auto',
    containerClassName,
  ].filter(Boolean).join(' ');
  
  // Build the label classes
  const labelClasses = [
    labelStyles,
    hasError ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300',
    disabled ? 'opacity-70' : '',
  ].filter(Boolean).join(' ');
  
  // Build the helper text classes
  const helperTextClasses = [
    helperTextStyles,
    hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400',
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Start Icon */}
        {props.startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {props.startIcon}
          </div>
        )}
        
        {/* Input Element */}
        <input
          id={id}
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={hasError}
          aria-describedby={`${helperText ? helperId : ''} ${hasError ? errorId : ''}`}
          aria-required={required}
          {...props}
        />
        
        {/* End Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Loading Spinner */}
          {loading && (
            <div className="text-gray-400">
              <Icon name="FiLoader" className="animate-spin h-4 w-4" />
            </div>
          )}
          
          {/* Clear Button */}
          {isClearable && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Clear input"
            >
              <Icon name="FiX" className="h-4 w-4" />
            </button>
          )}
          
          {/* Password Toggle */}
          {isPassword && !loading && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon
                name={showPassword ? 'FiEyeOff' : 'FiEye'}
                className="h-4 w-4"
              />
            </button>
          )}
          
          {/* Custom End Icon */}
          {props.endIcon && !loading && !isClearable && !isPassword && (
            <div className="text-gray-400">
              {props.endIcon}
            </div>
          )}
        </div>
      </div>
      
      {/* Helper Text */}
      {helperText && !hasError && (
        <p id={helperId} className={helperTextClasses}>
          {helperText}
        </p>
      )}
      
      {/* Error Message */}
      {hasError && (
        <p id={errorId} className={errorMessageStyles}>
          {localError || errorMessage}
        </p>
      )}
    </div>
  );
});

// Set display name for better debugging
InputField.displayName = 'InputField';

export default InputField;
