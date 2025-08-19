import React, { useState, useEffect, ReactNode } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable, Column } from './components/DataTable/DataTable';
import { Icon } from './components/ui/Icon';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
};

const generateUsers = (count: number): User[] => {
  const roles = ['Admin', 'User', 'Manager', 'Viewer'];
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    phone: `(${100 + (i % 900)}) ${100 + (i % 900)}-${1000 + (i % 9000)}`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>(() => generateUsers(20));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NavLink component for navigation items
  const NavLink = ({ to, icon, children }: { to: string; icon: string; children: ReactNode }) => (
    <a
      href={to}
      className="nav-link group relative"
    >
      <Icon name={icon as any} className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
      <span className="group-hover:translate-x-1 transition-transform">{children}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (user) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
            <Icon name="FiUser" className="h-5 w-5" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ID: {user.id}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      render: (user) => (
        <div className="flex items-center">
          <Icon name="FiMail" className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{user.email}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      sortable: true,
      render: (user) => (
        <div className="flex items-center">
          <Icon name="FiPhone" className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{user.phone}</span>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => {
        const roleColors = {
          Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
          User: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
          Manager: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          Viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        };
        
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColors[user.role as keyof typeof roleColors] || 'bg-gray-100 text-gray-800'}`}>
            {user.role}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => {
        const statusColors = {
          active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
          inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
          pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        };
        
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
        );
      },
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      sortable: true,
      render: (user) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(user.lastLogin).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (user) => (
        <div className="flex justify-end space-x-2">
          <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
            <Icon name="FiEdit2" className="h-4 w-4" />
          </button>
          <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
            <Icon name="FiTrash2" className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className={`sticky top-0 z-50 navbar transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Icon name="FiUsers" className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground font-din">UserFlow</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:space-x-1">
              <NavLink to="/dashboard" icon="home">Dashboard</NavLink>
              <NavLink to="/users" icon="users">Users</NavLink>
              <NavLink to="/analytics" icon="bar-chart-2">Analytics</NavLink>
              <NavLink to="/settings" icon="settings">Settings</NavLink>
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="FiSearch" className="h-4 w-4 text-muted-foreground" />
                </div>
                <InputField
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 w-64 text-sm h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Icon name="FiSun" className="h-5 w-5" />
                ) : (
                  <Icon name="FiMoon" className="h-5 w-5" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none group"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-medium text-sm shadow-sm group-hover:shadow-md transition-shadow">
                    Admin
                  </div>
                  <span className="hidden lg:inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    User
                    <Icon name="FiChevronDown" className="ml-1 h-4 w-4" />
                  </span>
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <Icon name="FiX" className="h-5 w-5" />
                  ) : (
                    <Icon name="FiMenu" className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/dashboard" icon="home">Dashboard</NavLink>
              <NavLink to="/users" icon="users">Users</NavLink>
              <NavLink to="/analytics" icon="bar-chart-2">Analytics</NavLink>
              <NavLink to="/settings" icon="settings">Settings</NavLink>
              <div className="px-4 pt-4 pb-2">
                <InputField
                  type="text"
                  placeholder="Search users..."
                  className="w-full text-sm h-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startIcon="FiSearch"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground font-din">User Management</h1>
              <span className="ml-3 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {users.length} Users
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your users and their permissions in one place
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary inline-flex items-center px-4 py-2.5 text-sm font-medium"
          >
            <Icon name="FiPlus" className="-ml-1 mr-2 h-4 w-4" />
            Add New User
          </button>
        </div>
        <div className="card">
          <div className="p-1">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select className="appearance-none bg-transparent border-0 text-sm font-medium focus:ring-0 focus:outline-none pr-6">
                    <option>All Users</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
                  <Icon name="FiChevronDown" className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="FiFilter" className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="FiDownload" className="h-4 w-4" />
                </button>
              </div>
            </div>
            <DataTable
              data={filteredUsers}
              columns={columns}
              className="w-full"
              pagination
              pageSize={5}
              selectable
              onRowClick={(row: User) => console.log('Row clicked:', row)}
            />
          </div>
        </div>
      </main>
      <footer className="border-t border-border mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} UserFlow</span>
              <span className="hidden md:inline-block">•</span>
              <span className="hidden md:inline-block">v1.0.0</span>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
