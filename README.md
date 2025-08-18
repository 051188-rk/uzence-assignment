# React TypeScript Component Library

A modern, accessible, and customizable component library built with React, TypeScript, and Tailwind CSS. This project includes reusable UI components with full TypeScript support, Storybook documentation, and comprehensive test coverage.

## 🚀 Features

- **Type-Safe Components**: Built with TypeScript for enhanced developer experience
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Built-in dark mode support
- **Accessible**: Follows WAI-ARIA guidelines
- **Customizable**: Themeable and extensible components
- **Fully Tested**: Comprehensive test coverage with React Testing Library
- **Documentation**: Interactive documentation with Storybook

## 📦 Components

### InputField
A versatile input component with multiple variants, sizes, and states.

**Features:**
- Multiple variants: outlined, filled, ghost
- Different sizes: sm, md, lg
- Support for icons, labels, and helper text
- Error states and validation
- Password visibility toggle
- Loading state
- Full accessibility support

### DataTable
A powerful and flexible data table component with sorting, pagination, and row selection.

**Features:**
- Sortable columns
- Client-side and server-side pagination
- Row selection (single/multiple)
- Custom cell rendering
- Loading and empty states
- Responsive design
- Full accessibility support

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-ts-component-library.git
   cd react-ts-component-library
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## 🚀 Usage

### Running the Development Server

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Running Storybook

To view the component documentation and interact with the components in Storybook:

```bash
npm run storybook
# or
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the Storybook.

### Running Tests

```bash
# Run all tests
npm test
# or
yarn test

# Run tests with coverage
npm test -- --coverage
# or
yarn test --coverage
```

## 📝 Documentation

### Component Props

#### InputField

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | The input value |
| onChange | (e: React.ChangeEvent<HTMLInputElement>) => void | - | Change event handler |
| label | string | - | Input label |
| placeholder | string | - | Input placeholder |
| helperText | string | - | Helper text below the input |
| errorMessage | string | - | Error message to display |
| disabled | boolean | false | Disable the input |
| invalid | boolean | false | Mark the input as invalid |
| variant | 'outlined' \| 'filled' \| 'ghost' | 'outlined' | Input variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Input size |
| showClearButton | boolean | true | Show clear button when there's a value |
| isPassword | boolean | false | Toggle password visibility |
| loading | boolean | false | Show loading state |
| fullWidth | boolean | false | Make input take full width |
| className | string | - | Additional CSS classes |

#### DataTable

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| data | T[] | [] | Array of data to display |
| columns | Column<T>[] | [] | Column configuration |
| loading | boolean | false | Show loading state |
| selectable | boolean | false | Enable row selection |
| onRowSelect | (selectedRows: T[]) => void | - | Row selection callback |
| sortable | boolean | true | Enable column sorting |
| onSort | (key: string, direction: 'asc' \| 'desc' \| null) => void | - | Sort callback |
| defaultSort | { key: string, direction: 'asc' \| 'desc' } | - | Default sort configuration |
| pagination | boolean | false | Enable pagination |
| pageSize | number | 10 | Number of items per page |
| currentPage | number | 1 | Current page number |
| totalItems | number | data.length | Total number of items (for server-side pagination) |
| onPageChange | (page: number) => void | - | Page change callback |
| showHeader | boolean | true | Show table header |
| showFooter | boolean | false | Show table footer |
| footerContent | (selectedRows: T[]) => React.ReactNode | - | Custom footer content |
| emptyState | React.ReactNode | - | Custom empty state |
| className | string | - | Additional CSS classes |
| rowClassName | string \| ((item: T, index: number) => string) | - | Row CSS classes or function |
| headerClassName | string | - | Header row CSS classes |
| bodyClassName | string | - | Table body CSS classes |

## 🎨 Theming

This project uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.js` file.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (latest)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

Made with ❤️ by Your Name

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
