# Waii Widget Examples

This repository contains example implementations of the Waii Chat Widget in different JavaScript environments:

- **Standalone**: Pure JavaScript implementation
- **React**: React component implementation
- **iFrame**: Embedded iFrame implementation with additional controls

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
waii-widget-examples/
├── iframe/
│   └── index.html
├── react/
│   ├── src/
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── ...
├── standalone/
│   └── index.html
├── package.json
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/waii-ai/waii-widget-examples.git
   cd waii-widget-examples
   ```

2. Install dependencies for all examples:
   ```bash
   npm install
   ```

### Running the Examples

#### Standalone Example
```bash
cd standalone
npm start
```
The example will be available at `http://localhost:3000`

#### React Example
```bash
cd react
npm start
```
The example will be available at `http://localhost:3001`

#### iFrame Example
```bash
cd iframe
npm start
```
The example will be available at `http://localhost:3002`

## Configuration

Each example uses the Waii Chat Widget with different configuration options. Make sure to replace the following values with your own:

- `apiKey`: Your Waii API key
- `databaseKey`: Your database connection string
- `apiUrl`: Your API endpoint (if different from default)

## Features Demonstrated

### Standalone Example
- Basic widget initialization
- Event handling
- Responsive design

### React Example
- React component integration
- TypeScript implementation
- Custom styling

### iFrame Example
- iFrame embedding
- Theme toggling
- Widget destruction
- Custom controls

## Copyright

© 2024 Waii AI. All Rights Reserved.
