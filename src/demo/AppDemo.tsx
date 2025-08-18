import React, { useState } from 'react';
import { InputField } from '../components/InputField/InputField';
import { DataTable, Column } from '../components/DataTable/DataTable';
import { Icon } from '../components/ui/Icon';

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
      <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
        <Icon name="FiMail" className="mr-2 h-4 w-4 text-gray-400" />
        {user.email}
      </div>
    ),
  },
  {
    key: 'phone',
    header: 'Phone',
    sortable: true,
    render: (user) => (
      <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
        <Icon name="FiPhone" className="mr-2 h-4 w-4 text-gray-400" />
        {user.phone}
      </div>
    ),
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    render: (user) => {
      const roleClasses = {
        Admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        User: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        Manager: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        Viewer: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      };
      
      return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${roleClasses[user.role as keyof typeof roleClasses] || ''}`}>
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
      const statusClasses = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        inactive: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      };
      
      return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[user.status]}`}>
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
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(user.lastLogin).toLocaleDateString()}
      </div>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: (user) => (
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => console.log(`Edit user ${user.id}`)}
          className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
          aria-label={`Edit ${user.name}`}
        >
          <Icon name="FiEdit2" className="h-4 w-4" />
        </button>
        <button
          onClick={() => console.log(`Delete user ${user.id}`)}
          className="p-1.5 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
          aria-label={`Delete ${user.name}`}
        >
          <Icon name="FiTrash2" className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export const AppDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Generate sample data
  const allUsers = React.useMemo(() => generateUsers(25), []);
  
  // Filter users based on search term
  const filteredUsers = React.useMemo(() => {
    if (!searchTerm.trim()) return allUsers;
    const term = searchTerm.toLowerCase();
    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.status.toLowerCase().includes(term)
    );
  }, [allUsers, searchTerm]);
  
  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Handle row selection
  const handleRowSelect = (rows: User[]) => {
    setSelectedRows(rows);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your application users and their permissions
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
              Add User
            </button>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <InputField
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startIcon={<Icon name="FiSearch" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                className="pl-10 w-full"
                variant="outlined"
                size="md"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                defaultValue=""
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <button className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                Filter
              </button>
            </div>
          </div>
        </div>
        
        {/* DataTable */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden
        ">
          <DataTable
            data={filteredUsers}
            columns={columns}
            selectable
            onRowSelect={handleRowSelect}
            pagination
            pageSize={5}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={filteredUsers.length}
            showFooter
            footerContent={(selected) => (
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
                  {selected.length > 0 ? (
                    <span>{selected.length} of {filteredUsers.length} user(s) selected</span>
                  ) : (
                    <span>Showing {Math.min(filteredUsers.length, 5)} of {filteredUsers.length} users</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.length > 0 && (
                    <>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
                        Export Selected
                      </button>
                      <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600">
                        Delete Selected
                      </button>
                    </>
                  )}
                  <button className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                    Export All
                  </button>
                </div>
              </div>
            )}
            emptyState={
              <div className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No users found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? 'Try adjusting your search or filter to find what you\'re looking for.'
                    : 'There are currently no users in the system.'}
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    <Icon name="FiUser" className="-ml-1 mr-2 h-5 w-5" />
                    Add New User
                  </button>
                </div>
              </div>
            }
          />
        </div>
        
        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Showing {Math.min(filteredUsers.length, 5)} of {filteredUsers.length} users</p>
          <p className="mt-1">
            {selectedRows.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Icon name="FiUser" className="mr-1 h-3 w-3" />
                {selectedRows.length} selected
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDemo;
