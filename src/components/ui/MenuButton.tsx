import React, { useState } from 'react';
import { Icon } from './Icon';
import { useTheme } from '../../contexts/ThemeContext';

export const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative menu-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Icon name="FiMenu" className="h-5 w-5" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              role="menuitem"
              tabIndex={-1}
            >
              <Icon 
                name={theme === 'dark' ? 'FiSun' : 'FiMoon'} 
                className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" 
                aria-hidden="true"
              />
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>

            {/* Dummy Menu Items */}
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              role="menuitem"
              tabIndex={-1}
            >
              <Icon name="FiUser" className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              Profile
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              role="menuitem"
              tabIndex={-1}
            >
              <Icon name="FiMail" className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              Messages
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              role="menuitem"
              tabIndex={-1}
            >
              <Icon name="FiSettings" className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              Settings
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
