import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable, Column } from './DataTable';
import '@testing-library/jest-dom';

interface TestItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

// Mock data for testing
const testData: TestItem[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' as const },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'inactive' as const },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'active' as const },
];

const testColumns: Column<TestItem>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

describe('DataTable', () => {
  test('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Check if headers are rendered
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check if data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });

  test('displays empty state when no data', () => {
    const emptyMessage = 'No data available';
    render(
      <DataTable
        data={[]}
        columns={testColumns}
        emptyState={<div>{emptyMessage}</div>}
      />
    );
    
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('handles row selection', () => {
    const handleRowSelect = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    // Select first row
    const checkbox = screen.getAllByRole('checkbox')[1]; // First checkbox is for select all
    fireEvent.click(checkbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  test('handles select all', () => {
    const handleRowSelect = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        selectable
        onRowSelect={handleRowSelect}
      />
    );
    
    // Click select all checkbox
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);
    
    expect(handleRowSelect).toHaveBeenCalledWith(expect.arrayContaining(testData));
  });

  test('sorts columns when header is clicked', () => {
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        sortable
      />
    );
    
    // Click name column header to sort
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Get all name cells to check sort order
    const nameCells = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Alice Johnson/ });
    
    // Check if sorted in ascending order (Alice, Jane, John)
    expect(nameCells[0]).toHaveTextContent('Alice Johnson');
    expect(nameCells[1]).toHaveTextContent('Jane Smith');
    expect(nameCells[2]).toHaveTextContent('John Doe');
    
    // Click again to sort descending
    fireEvent.click(nameHeader);
    
    const nameCellsDesc = screen.getAllByRole('cell', { name: /John Doe|Jane Smith|Alice Johnson/ });
    
    // Check if sorted in descending order (John, Jane, Alice)
    expect(nameCellsDesc[0]).toHaveTextContent('John Doe');
    expect(nameCellsDesc[1]).toHaveTextContent('Jane Smith');
    expect(nameCellsDesc[2]).toHaveTextContent('Bob Johnson');
  });

  test('handles pagination', () => {
    // Generate test data with more than one page
    const largeTestData: TestItem[] = Array.from({ length: 15 }, (_, i) => {
      const status: 'active' | 'inactive' = i % 3 === 0 ? 'inactive' : 'active';
      return {
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 2 === 0 ? 'Admin' : 'User',
        status,
      };
    });
    
    render(
      <DataTable
        data={largeTestData}
        columns={testColumns}
        pagination
        pageSize={5}
      />
    );
    
    // Should show page info
    expect(screen.getByText('Showing 1 to 5 of 15 results')).toBeInTheDocument();
    
    // Click next page
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);
    
    // Should show next page info
    expect(screen.getByText('Showing 6 to 10 of 15 results')).toBeInTheDocument();
  });

  test('applies custom row class names', () => {
    const rowClassName = (item: TestItem) => 
      item.status === 'active' ? 'bg-green-50' : 'bg-red-50';
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        rowClassName={rowClassName}
      />
    );
    
    // Get all rows (skipping header row)
    const rows = screen.getAllByRole('row').slice(1);
    
    // First row (active) should have bg-green-50
    expect(rows[0]).toHaveClass('bg-green-50');
    // Second row (inactive) should have bg-red-50
    expect(rows[1]).toHaveClass('bg-red-50');
  });

  test('calls onSort when sortable column header is clicked', () => {
    const handleSort = jest.fn();
    
    render(
      <DataTable
        data={testData}
        columns={testColumns}
        sortable
        onSort={handleSort}
      />
    );
    
    // Click on name column header
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    
    // Click again to sort descending
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', 'desc');
    
    // Click again to remove sort
    fireEvent.click(nameHeader);
    expect(handleSort).toHaveBeenCalledWith('name', null);
  });

  test('disables sorting when sortable is false', () => {
    render(
      <DataTable
        data={testData}
        columns={[
          { key: 'name', header: 'Name', sortable: false },
          { key: 'email', header: 'Email' },
        ]}
      />
    );
    
    // Name column should not be sortable
    const nameHeader = screen.getByText('Name');
    expect(nameHeader).not.toHaveClass('cursor-pointer');
    
    // Email column should not be sortable (default)
    const emailHeader = screen.getByText('Email');
    expect(emailHeader).not.toHaveClass('cursor-pointer');
  });

  test('renders custom cell content', () => {
    const columnsWithCustomRender: Column<TestItem>[] = [
      {
        key: 'name',
        header: 'Name',
        render: (item) => <strong>{item.name.toUpperCase()}</strong>,
      },
      { key: 'email', header: 'Email' },
    ];
    
    render(
      <DataTable
        data={[testData[0]]}
        columns={columnsWithCustomRender}
      />
    );
    
    // Check if custom render function was used
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
    expect(screen.getByText('JOHN DOE').tagName).toBe('STRONG');
  });
});
