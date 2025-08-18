import React, { useState, useMemo, useEffect } from 'react';
import { Icon } from '../ui/Icon';

type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

interface SortState<T> {
  key: keyof T | string;
  direction: SortDirection;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (key: keyof T | string, direction: SortDirection) => void;
  sortable?: boolean;
  defaultSort?: SortState<T>;
  emptyState?: React.ReactNode;
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  headerClassName?: string;
  bodyClassName?: string;
  pagination?: boolean;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalItems?: number;
  showHeader?: boolean;
  showFooter?: boolean;
  footerContent?: (selectedRows: T[]) => React.ReactNode;
}

const defaultEmptyState = (
  <div className="py-12 text-center text-gray-500 dark:text-gray-400">
    No data available
  </div>
);

export function DataTable<T>({
  data = [],
  columns = [],
  loading = false,
  selectable = false,
  onRowSelect,
  onSort,
  sortable = true,
  defaultSort,
  emptyState = defaultEmptyState,
  className = '',
  rowClassName = '',
  headerClassName = '',
  bodyClassName = '',
  pagination = false,
  pageSize = 10,
  onPageChange,
  currentPage: controlledCurrentPage,
  totalItems: controlledTotalItems,
  showHeader = true,
  showFooter = false,
  footerContent,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortState, setSortState] = useState<SortState<T> | null>(
    defaultSort || null
  );
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  
  const isControlled = controlledCurrentPage !== undefined;
  const currentPage = isControlled ? controlledCurrentPage : internalCurrentPage;
  const totalItems = controlledTotalItems !== undefined ? controlledTotalItems : data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Reset selected rows when data changes
  useEffect(() => {
    setSelectedRows(new Set());
  }, [data]);

  // Handle row selection
  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    if (checked) {
      newSelectedRows.add(index);
    } else {
      newSelectedRows.delete(index);
    }
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(i => data[i]);
      onRowSelect(selectedData);
    }
  };

  // Handle select all rows
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(Array.from({ length: data.length }, (_, i) => i));
      setSelectedRows(allIndices);
      if (onRowSelect) {
        onRowSelect([...data]);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  // Handle sorting
  const handleSort = (key: keyof T | string) => {
    if (!sortable) return;
    
    let direction: SortDirection = 'asc';
    
    if (sortState && sortState.key === key) {
      if (sortState.direction === 'asc') {
        direction = 'desc';
      } else if (sortState.direction === 'desc') {
        direction = null;
      } else {
        direction = 'asc';
      }
    }
    
    const newSortState = direction ? { key, direction } : null;
    setSortState(newSortState);
    
    if (onSort) {
      onSort(key, direction);
    }
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    if (!isControlled) {
      setInternalCurrentPage(page);
    }
    
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Process data based on sorting and pagination
  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply sorting if needed
    if (sortState && sortState.direction && !onSort) {
      result = [...data].sort((a, b) => {
        const aValue = a[sortState.key as keyof T];
        const bValue = b[sortState.key as keyof T];
        
        if (aValue === bValue) return 0;
        
        if (sortState.direction === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
    }
    
    // Apply pagination if needed
    if (pagination && !isControlled) {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      result = result.slice(start, end);
    }
    
    return result;
  }, [data, sortState, currentPage, pageSize, pagination, isControlled, onSort]);

  // Render cell content
  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }
    
    const value = item[column.key as keyof T];
    
    if (value === undefined || value === null) {
      return '-';
    }
    
    return String(value);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of the middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start or end
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Check if all rows on current page are selected
  const allSelected = useMemo(() => {
    if (!selectable || !data.length) return false;
    
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, data.length);
    
    for (let i = start; i < end; i++) {
      if (!selectedRows.has(i)) {
        return false;
      }
    }
    
    return selectedRows.size > 0;
  }, [selectable, data.length, currentPage, pageSize, selectedRows]);

  // Check if some rows on current page are selected
  const someSelected = useMemo(() => {
    if (!selectable || !data.length) return false;
    
    const start = (currentPage - 1) * pageSize;
    const end = Math.min(start + pageSize, data.length);
    
    for (let i = start; i < end; i++) {
      if (selectedRows.has(i)) {
        return true;
      }
    }
    
    return false;
  }, [selectable, data.length, currentPage, pageSize, selectedRows]);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Table Wrapper */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 dark:ring-gray-700 rounded-lg">
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              {showHeader && (
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {selectable && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-10"
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                            checked={allSelected}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            aria-label="Select all rows"
                          />
                        </div>
                      </th>
                    )}
                    {columns.map((column) => (
                      <th
                        key={String(column.key)}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider ${
                          column.align === 'center' ? 'text-center' : ''
                        } ${column.align === 'right' ? 'text-right' : ''}`}
                        style={{ width: column.width }}
                      >
                        <div
                          className={`flex items-center ${
                            column.align === 'center' ? 'justify-center' : ''
                          } ${column.align === 'right' ? 'justify-end' : ''} ${
                            column.sortable ? 'cursor-pointer select-none' : ''
                          }`}
                          onClick={() =>
                            column.sortable && handleSort(column.key)
                          }
                        >
                          {column.header}
                          {column.sortable && (
                            <span className="ml-2 flex-none">
                              {sortState?.key === column.key ? (
                                sortState.direction === 'asc' ? (
                                  <Icon name="FiChevronUp" className="h-4 w-4" />
                                ) : sortState.direction === 'desc' ? (
                                  <Icon name="FiChevronDown" className="h-4 w-4" />
                                ) : (
                                  <span className="text-gray-300 dark:text-gray-600">
                                    <Icon name="FiChevronUp" className="h-4 w-4 -mb-1" />
                                    <Icon name="FiChevronDown" className="h-4 w-4 -mt-1" />
                                  </span>
                                )
                              ) : (
                                <span className="text-gray-300 dark:text-gray-600">
                                  <Icon name="FiChevronUp" className="h-4 w-4 -mb-1" />
                                  <Icon name="FiChevronDown" className="h-4 w-4 -mt-1" />
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              
              <tbody className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ${bodyClassName}`}>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0)}
                      className="px-6 py-12 text-center"
                    >
                      <div className="flex justify-center">
                        <Icon name="FiLoader" className="h-8 w-8 animate-spin text-blue-500" />
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Loading data...
                      </p>
                    </td>
                  </tr>
                ) : processedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0)}
                      className="px-6 py-12 text-center"
                    >
                      {emptyState}
                    </td>
                  </tr>
                ) : (
                  processedData.map((item, index) => {
                    const rowIndex = (currentPage - 1) * pageSize + index;
                    const rowClass =
                      typeof rowClassName === 'function'
                        ? rowClassName(item, rowIndex)
                        : rowClassName;
                    
                    return (
                      <tr
                        key={rowIndex}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          selectedRows.has(rowIndex)
                            ? 'bg-blue-50 dark:bg-blue-900/30'
                            : ''
                        } ${rowClass || ''}`}
                      >
                        {selectable && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                checked={selectedRows.has(rowIndex)}
                                onChange={(e) =>
                                  handleRowSelect(rowIndex, e.target.checked)
                                }
                                aria-label={`Select row ${rowIndex + 1}`}
                              />
                            </div>
                          </td>
                        )}
                        {columns.map((column) => (
                          <td
                            key={String(column.key)}
                            className={`px-6 py-4 whitespace-nowrap text-sm ${
                              column.align === 'center' ? 'text-center' : ''
                            } ${column.align === 'right' ? 'text-right' : ''} ${
                              column.width ? 'truncate' : ''
                            }`}
                            style={{ maxWidth: column.width }}
                            title={
                              column.width
                                ? String(renderCell(item, column))
                                : undefined
                            }
                          >
                            {renderCell(item, column)}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
              
              {showFooter && footerContent && (
                <tfoot className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <td
                      colSpan={columns.length + (selectable ? 1 : 0)}
                      className="px-6 py-3 text-sm text-gray-500 dark:text-gray-300"
                    >
                      {footerContent(
                        Array.from(selectedRows).map((i) => data[i])
                      )}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">
                  {data.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
                </span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, totalItems)}
                </span>{' '}
                of <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="First page"
                >
                  <span className="sr-only">First</span>
                  <Icon name="FiChevronLeft" className="h-4 w-4" />
                  <Icon name="FiChevronLeft" className="h-4 w-4 -ml-1" />
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <span className="sr-only">Previous</span>
                  <Icon name="FiChevronLeft" className="h-4 w-4" />
                </button>
                
                {getPageNumbers().map((page, index) =>
                  page === '...' ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 dark:bg-blue-900/50 border-blue-500 text-blue-600 dark:text-blue-300'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <span className="sr-only">Next</span>
                  <Icon name="FiChevronRight" className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Last page"
                >
                  <span className="sr-only">Last</span>
                  <Icon name="FiChevronRight" className="h-4 w-4 -mr-1" />
                  <Icon name="FiChevronRight" className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
