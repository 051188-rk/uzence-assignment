import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { DataTable, Column } from './DataTable';
import { Icon } from '../ui/Icon';

// Sample data type for our examples
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

// Sample data
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-05-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(234) 567-8901',
    role: 'User',
    status: 'active',
    lastLogin: '2023-05-14T15:45:00Z',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '(345) 678-9012',
    role: 'User',
    status: 'inactive',
    lastLogin: '2023-05-10T09:15:00Z',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '(456) 789-0123',
    role: 'Manager',
    status: 'pending',
    lastLogin: '2023-05-05T14:20:00Z',
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '(567) 890-1234',
    role: 'User',
    status: 'active',
    lastLogin: '2023-05-12T11:10:00Z',
  },
];

// Status badge component for the table
const StatusBadge = ({ status }: { status: User['status'] }) => {
  const statusClasses = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({ id }: { id: number }) => (
  <div className="flex space-x-2">
    <button
      onClick={() => console.log(`Edit user ${id}`)}
      className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
      aria-label={`Edit user ${id}`}
    >
      <Icon name="FiEdit2" className="h-4 w-4" />
    </button>
    <button
      onClick={() => console.log(`Delete user ${id}`)}
      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
      aria-label={`Delete user ${id}`}
    >
      <Icon name="FiTrash2" className="h-4 w-4" />
    </button>
  </div>
);

// Define columns for the data table
const customRenderColumns: Column<User>[] = [
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
        <Icon name="FiBriefcase" className="mr-2 h-4 w-4 text-gray-400" />
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
    render: (user) => (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        {user.role}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (user) => <StatusBadge status={user.status} />,
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
    render: (user) => <ActionButtons id={user.id} />,
  },
];

// Simplified columns for basic examples
const basicColumns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  tags: ['autodocs'],
  argTypes: {
    selectable: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    sortable: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    pagination: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showHeader: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showFooter: { 
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    data: users,
    columns: basicColumns,
    selectable: false,
    loading: false,
    sortable: true,
    pagination: false,
    showHeader: true,
    showFooter: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: users.slice(0, 3),
    columns: basicColumns,
  },
};

export const WithPagination: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: [...users, ...users, ...users], // More data for pagination
    columns: basicColumns,
    pagination: true,
    pageSize: 5,
  },
};

export const WithRowSelection: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: users,
    columns: basicColumns,
    selectable: true,
    onRowSelect: (selectedRows) => {
      console.log('Selected Rows:', selectedRows);
    },
  },
};

export const WithCustomRendering: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: users,
    columns: customRenderColumns,
    pagination: true,
    pageSize: 5,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
  },
};

export const WithEmptyState: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: [],
    columns: basicColumns,
    emptyState: (
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
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          No data available
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          There are currently no records to display.
        </p>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: users,
    columns: basicColumns,
    showFooter: true,
    footerContent: (selectedRows) => (
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {selectedRows.length > 0
            ? `${selectedRows.length} of ${users.length} row(s) selected`
            : `${users.length} total items`}
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300 rounded-md">
            Export
          </button>
          {selectedRows.length > 0 && (
            <button className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-300 rounded-md">
              Delete Selected
            </button>
          )}
        </div>
      </div>
    ),
  },
};

export const WithCustomStyling: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data: users,
    columns: basicColumns,
    className: 'rounded-lg border border-gray-200 dark:border-gray-700',
    headerClassName: 'bg-gray-50 dark:bg-gray-800',
    bodyClassName: 'divide-y divide-gray-200 dark:divide-gray-700',
    rowClassName: (item) =>
      item.status === 'inactive' ? 'bg-red-50/30 dark:bg-red-900/10' : '',
  },
};
