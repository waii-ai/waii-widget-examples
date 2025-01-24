# Waii Widget Examples

This repository contains example implementations of the Waii Chat Widget in different JavaScript environments:

- **Standalone**: Pure JavaScript implementation
- **React Examples**: React component implementation
- **iFrame**: Embedded iFrame implementation with additional controls

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
waii-widget-examples/
│
├── iframe/
│   ├── index.html
│   └── ...
│
├── react-examples/
│   ├── chat/
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── index.tsx
│   │   ├── index.html
│   │   └── ...
│   │
│   ├── chat-with-history/
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── index.tsx
│   │   ├── index.html
│   │   └── ...
│   │
│   └── history/
│       ├── src/
│       │   ├── App.tsx
│       │   └── index.tsx
│       ├── index.html
│       └── ...
│
├── standalone/
│   ├── index.html
│   └── ...
│
├── package.json
├── README.md
└── ...
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

#### Configuration

Each example needs to be modified before running it. At the very least you need to replace the following values with your own:

- `apiKey`: Your Waii API key
- `databaseKey`: Your database connection string
- `apiUrl`: Your API endpoint (if different from default)
- `iFrameScr`: Your iFrame host (if different from default, iframe example only)

#### Standalone Example

The values that need to be changed are in: [Standalone Webpage](./standalone/index.html)

```bash
npm start:standalone
```
The example will be available at `http://localhost:3000`

#### React Example

The values that need to be changed are in: [React Chat App](./react-examples/chat/src/App.tsx), [React Chat with History App](./react-examples/chat-with-history/src/App.tsx), [React History App](./react-examples/history/src/App.tsx)

```bash
npm start:react-chat
```
```bash
npm start:react-chat-with-history
```
```bash
npm start:react-history
```
The example will be available at `http://localhost:3001`

#### iFrame Example

The values that need to be changed are in: [iFrame Webpage](./iframe/index.html)

```bash
npm start:iframe
```
The example will be available at `http://localhost:3002`

## Features Demonstrated

### Standalone Example
- Basic widget initialization
- Event handling
- Responsive design

### React Examples
- React component integration
- TypeScript implementation
- Custom styling
- Chat Example: Waii Chat react component integration
- Chat with History Example: Waii Chat and History react component integration
- History Example: Waii History react component integration

### iFrame Example
- iFrame embedding
- Theme toggling
- Widget destruction
- Custom controls

## Copyright

© 2024-2025 Waii AI. All Rights Reserved.
