import { SVGProps } from 'react';
import * as FiIcons from 'react-icons/fi';
import { IconType } from 'react-icons';

// Define specific icon names we'll use for better type safety
type IconName = 
  | 'FiMenu' | 'FiSun' | 'FiMoon' | 'FiX' 
  | 'FiEye' | 'FiEyeOff' | 'FiLoader' | 'FiPlus'
  | 'FiChevronUp' | 'FiChevronDown' | 'FiChevronLeft' | 'FiChevronRight'
  | 'FiSearch' | 'FiUser' | 'FiUsers' | 'FiMail' | 'FiLock' 
  | 'FiCheck' | 'FiEdit2' | 'FiTrash2' | 'FiBriefcase'
  | 'FiFilter' | 'FiDownload' | 'FiPhone' | 'FiSettings';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  size?: number | string;
}

// Map of icon names to their corresponding components
const iconMap: { [key in IconName]?: IconType } = {
  FiMenu: FiIcons.FiMenu,
  FiSun: FiIcons.FiSun,
  FiMoon: FiIcons.FiMoon,
  FiX: FiIcons.FiX,
  FiEye: FiIcons.FiEye,
  FiEyeOff: FiIcons.FiEyeOff,
  FiLoader: FiIcons.FiLoader,
  FiPlus: FiIcons.FiPlus,
  FiChevronUp: FiIcons.FiChevronUp,
  FiChevronDown: FiIcons.FiChevronDown,
  FiChevronLeft: FiIcons.FiChevronLeft,
  FiChevronRight: FiIcons.FiChevronRight,
  FiSearch: FiIcons.FiSearch,
  FiUser: FiIcons.FiUser,
  FiMail: FiIcons.FiMail,
  FiLock: FiIcons.FiLock,
  FiCheck: FiIcons.FiCheck,
  FiEdit2: FiIcons.FiEdit2,
  FiTrash2: FiIcons.FiTrash2,
  FiBriefcase: FiIcons.FiBriefcase,
  FiFilter: FiIcons.FiFilter,
  FiDownload: FiIcons.FiDownload,
  FiPhone: FiIcons.FiPhone,
  FiSettings: FiIcons.FiSettings,
  FiUsers: FiIcons.FiUsers,
};

export const Icon = ({ 
  name, 
  className = '', 
  size = '1em',
  ...props 
}: IconProps) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon '${name}' not found`);
    return null;
  }

  // Create a proper JSX element with the icon component
  const IconElement = IconComponent as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  
  return (
    <IconElement 
      className={`inline-block ${className}`} 
      style={{ width: size, height: size }}
      {...props} 
    />
  );
};
