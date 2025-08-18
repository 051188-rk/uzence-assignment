import React, { useState } from 'react';
import { InputField } from './components/InputField/InputField';
import { DataTable, Column } from './components/DataTable/DataTable';
import { Icon } from './components/ui/Icon';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>(() => generateUsers(20));
  
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your application users and their permissions</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="w-full sm:w-96">
              <InputField
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startIcon={<Icon name="FiSearch" className="text-gray-400" />}
                className="w-full"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center space-x-2 transition-colors">
              <Icon name="FiPlus" className="h-4 w-4" />
              <span>Add User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <DataTable
              data={filteredUsers}
              columns={columns}
              pagination
              pageSize={5}
              selectable
              className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
            />
          </div>
        </div>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>User Management System &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
