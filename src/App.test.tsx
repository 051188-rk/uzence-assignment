import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the user management interface', () => {
    render(<App />);
    
    // Check if the main heading is rendered
    const headingElement = screen.getByRole('heading', { name: /user management/i });
    expect(headingElement).toBeInTheDocument();
    
    // Check if the search input is rendered
    const searchInput = screen.getByPlaceholderText(/search users/i);
    expect(searchInput).toBeInTheDocument();
    
    // Check if the data table is rendered
    const dataTable = screen.getByRole('table');
    expect(dataTable).toBeInTheDocument();
  });
});
