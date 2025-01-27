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

`config.js` in the root folder needs to be modified before running examples. At the very least you need to replace the following values with your own:

- `apiKey`: Your Waii API key
- `databaseKey`: Your database connection string
- `apiUrl`: Your API endpoint (if different from default)
- `iFrameScr`: Your iFrame host (if different from default, iframe example only)

#### Standalone Example

```bash
npm start:standalone
```
The example will be available at `http://localhost:3000`

#### React Example

```bash
npm run start:react-chat
```
```bash
npm run start:react-chat-with-history
```
```bash
npm run start:react-history
```
The example will be available at `http://localhost:3001`

#### iFrame Example

```bash
npm run start:iframe
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

#### WaiiChat widget
You can pass the following react props to this component for customisation:

| PROP                          | PURPOSE                                                   | NOTES                                                                                   |
|-------------------------------|-----------------------------------------------------------|-----------------------------------------------------------------------------------------|
| `apiKey`                      | API key used for authentication with the backend API.     | Optional. If not provided, the component may not connect to the backend API.            |
| `apiUrl`                      | The base URL of the backend API to send chat messages.    | Example: `https://api.example.com`.                                                     |
| `databaseKey`                 | Key to access the associated database for chat.           | Should match the backend database configuration.                                        |
| `selectedDBConnector`         | Database connector used for custom database logic.        | Example: a Prisma or custom DB connector instance.                                      |
| `theme`                       | The theme of the chat interface.                          | Options: `'light'`, `'dark'`. Default is `'light'`.                                     |
| `className`                   | Additional class name(s) for custom styling.              | Use to extend or override default styles.                                               |
| `chatStyles`                  | Custom styles for various elements in the chat interface. | See below for details on the structure of `chatStyles`.                                 |
| `botName`                     | Name of the bot displayed in the chat interface.          | Example: `'WaiiBot'`.                                                                   |
| `botAvatarUrl`                | URL of the bot's avatar image.                            | Example: `'https://example.com/avatar.png'`.                                            |
| `chatHistoryList`             | Array of chat history items displayed in the interface.   | Example: `[ { user: 'Hi', bot: 'Hello' } ]`.                                            |
| `useFewShotLearning`          | Enables few-shot learning for the AI model.               | Defaults to `null`.                                                                     |
| `useReflection`               | Enables reflection-based training for better responses.   | Defaults to `null`.                                                                     |
| `useStrictHallucinationCheck` | Enables strict checks to minimize hallucinated responses. | Defaults to `null`.                                                                     |
| `model`                       | AI model to use for chat responses.                       | Example: `'gpt-4'` or `'custom-model'`.                                                 |
| `handleChatResponse`          | Callback triggered when a chat response is received.      | Receives `(response, requestWithResponse)`. Use this for handling or logging responses. |
| `handleReset`                 | Callback triggered when the chat is reset.                | Example: clear the chat UI.                                                             |
| `handleEditChat`              | Function to handle editing messages in the chat.          | Example: a function that opens a modal to edit a specific message.                      |


| FIELD                              | PURPOSE                                                  | NOTES                                                              |
|------------------------------------|----------------------------------------------------------|--------------------------------------------------------------------|
| `chatStyles.container`             | Styles for the chat container element.                   | Example: `{ backgroundColor: '#fff', padding: '20px' }`.           |
| `chatStyles.messageList`           | Styles for the chat message list.                        | Example: `{ overflowY: 'scroll', maxHeight: '400px' }`.            |
| `chatStyles.userMessage.container` | Styles for the container of a user message.              | Example: `{ display: 'flex', justifyContent: 'flex-end' }`.        |
| `chatStyles.userMessage.text`      | Styles for the text inside a user message.               | Example: `{ fontSize: '14px', color: '#000' }`.                    |
| `chatStyles.userMessage.bubble`    | Styles for the message bubble of a user message.         | Example: `{ backgroundColor: '#e0f7fa', borderRadius: '10px' }`.   |
| `chatStyles.botMessage.container`  | Styles for the container of a bot message.               | Example: `{ display: 'flex', justifyContent: 'flex-start' }`.      |
| `chatStyles.botMessage.text`       | Styles for the text inside a bot message.                | Example: `{ fontSize: '14px', color: '#fff' }`.                    |
| `chatStyles.botMessage.bubble`     | Styles for the message bubble of a bot message.          | Example: `{ backgroundColor: '#4caf50', borderRadius: '10px' }`.   |
| `chatStyles.input.container`       | Styles for the input container element.                  | Example: `{ display: 'flex', alignItems: 'center' }`.              |
| `chatStyles.input.textArea`        | Styles for the text area where the user types a message. | Example: `{ flex: 1, padding: '10px', border: '1px solid #ccc' }`. |
| `chatStyles.input.sendButton`      | Styles for the send button next to the input field.      | Example: `{ backgroundColor: '#4caf50', color: '#fff' }`.          |
| `chatStyles.input.sendButtonIcon`  | Custom icon for the send button.                         | Example: `<SendIcon />`.                                           |


#### WaiiChatHistory widget
You can pass the following react props to this component for customisation:

| PROP                         | PURPOSE                                                                       | NOTES                                                                                |
|------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `apiKey`                     | API key used for authentication with the backend API.                         | Optional. If not provided, the component may not connect to the backend API.         |
| `apiUrl`                     | The base URL of the backend API to retrieve history.                          | Example: `https://api.example.com`.                                                  |
| `databaseKey`                | Key to access the associated database for history retrieval.                  | Should match the backend database configuration.                                     |
| `history`                    | An array of chat history entries to display.                                  | Example: `[ { id: '1', title: 'Session 1', date: '2025-01-27' } ]`.                  |
| `initialDisplayCount`        | Number of history items to display initially.                                 | Defaults to `5`. Use this to control how many items are visible by default.          |
| `onSessionSelect`            | Callback triggered when a session is selected.                                | Receives `(sessionId, group?)`. Example: navigate to a detailed view of the session. |
| `className`                  | Additional class name(s) for custom styling.                                  | Use to extend or override default styles.                                            |
| `historyListItemStyles`      | Custom styles for individual history list items.                              | See below for details on `WaiiHistoryListItemStyles`.                                |
| `historyListBackgroundColor` | Background color for the history list.                                        | Example: `'#ffffff'` for light mode, or `'#1a1a1a'` for dark mode.                   |
| `isDarkMode`                 | Whether the component should use dark mode styling.                           | Defaults to `false`.                                                                 |
| `style`                      | Inline styles for the root container.                                         | Use to apply additional customizations to the component's container.                 |
| `theme`                      | Custom theme for the history list, including colors, spacing, and typography. | Partial object. See below for details on `WaiiHistoryTheme`.                         |
| `maxHeight`                  | Maximum height of the history list.                                           | Defaults to `384px`. Use a string or number value.                                   |
| `minWidth`                   | Minimum width of the history list.                                            | Defaults to `300px`. Use a string or number value.                                   |
| `loadingComponent`           | Custom component to display during loading state.                             | Example: a spinner or skeleton loader component.                                     |
| `errorComponent`             | Custom component to display if an error occurs.                               | Example: `<>Error loading history</>`.                                               |
| `emptyComponent`             | Custom component to display when no history is available.                     | Example: `<>No history found</>`.                                                    |
| `showSearch`                 | Whether to show the search bar in the history list.                           | Defaults to `true`. Set to `false` to hide search functionality.                     |
| `searchPlaceholder`          | Placeholder text for the search input field.                                  | Defaults to `'Search conversations...'`.                                             |
| `showLoadMore`               | Whether to show the "Load More" button for additional history items.          | Defaults to `true`.                                                                  |
| `loadMoreText`               | Text displayed on the "Load More" button.                                     | Defaults to `'Show More'`.                                                           |
| `loadMoreIncrement`          | Number of additional items to display when "Load More" is clicked.            | Defaults to `7`.                                                                     |
| `formatDate`                 | Function to format dates displayed in the history.                            | Example: `(date) => new Date(date).toLocaleDateString()`.                            |
| `onSearchChange`             | Callback triggered when the search term changes.                              | Receives `(term)`. Use this to filter or fetch search results.                       |
| `showNewChat`                | Whether to display the "New Chat" button.                                     | Defaults to `true`.                                                                  |
| `newChatText`                | Text or component for the "New Chat" button.                                  | Defaults to `'New Chat'`. Example: `<CustomButton>New Chat</CustomButton>`.          |
| `newChatButtonStyles`        | Inline styles for the "New Chat" button.                                      | Example: `{ backgroundColor: '#4caf50', color: '#fff' }`.                            |
| `onNewChat`                  | Callback triggered when the "New Chat" button is clicked.                     | Defaults to a no-op function.                                                        |
| `onLoadHistory`              | Callback triggered when the chat history is loaded.                           | Receives the full history array as a parameter.                                      |
| `customNewChatButton`        | Custom component to replace the default "New Chat" button.                    | Example: `<Button variant="primary">Start New Chat</Button>`.                        |

| FIELD                         | PURPOSE                                    | NOTES                                                                 |
|-------------------------------|--------------------------------------------|-----------------------------------------------------------------------|
| `theme.colors.primary`        | Primary color used for highlighting.       | Example: `'#1a73e8'`.                                                 |
| `theme.colors.background`     | Background color for the entire component. | Example: `'#ffffff'` for light mode or `'#1a1a1a'` for dark mode.     |
| `theme.colors.text`           | Text color for primary content.            | Example: `'#000000'` for light themes or `'#ffffff'` for dark themes. |
| `theme.colors.secondaryText`  | Text color for less prominent content.     | Example: `'#666666'`.                                                 |
| `theme.colors.border`         | Color used for borders.                    | Example: `'#e0e0e0'`.                                                 |
| `theme.colors.hover`          | Background color for hover states.         | Example: `'#f5f5f5'`.                                                 |
| `theme.colors.selected`       | Background color for selected items.       | Example: `'#d3d3f3'`.                                                 |
| `theme.spacing.padding`       | Padding inside components.                 | Example: `'10px'`.                                                    |
| `theme.spacing.margin`        | Margin around components.                  | Example: `'8px'`.                                                     |
| `theme.spacing.borderRadius`  | Border radius for rounded corners.         | Example: `'5px'`.                                                     |
| `theme.typography.titleSize`  | Font size for titles.                      | Example: `'18px'`.                                                    |
| `theme.typography.textSize`   | Font size for regular text.                | Example: `'14px'`.                                                    |
| `theme.typography.fontFamily` | Font family used across the component.     | Optional. Defaults to the browser's sans-serif font.                  |
| `theme.typography.lineHeight` | Line height for better readability.        | Example: `'1.5'`.                                                     |

| FIELD                                | PURPOSE                                         | NOTES                                                           |
|--------------------------------------|-------------------------------------------------|-----------------------------------------------------------------|
| `historyListItemStyles.container`    | Custom styles for the entire history list item. | Example: `{ display: 'flex', alignItems: 'center' }`.           |
| `historyListItemStyles.summary`      | Styles for the session summary text.            | Example: `{ fontWeight: 'bold' }`.                              |
| `historyListItemStyles.date`         | Styles for the date text displayed.             | Example: `{ color: '#888' }`.                                   |
| `historyListItemStyles.messageCount` | Styles for the message count indicator.         | Example: `{ backgroundColor: '#f0f0f0', borderRadius: '50%' }`. |
| `historyListItemStyles.hover`        | Styles applied when the list item is hovered.   | Example: `{ backgroundColor: '#e8e8e8' }`.                      |
| `historyListItemStyles.selected`     | Styles applied when the list item is selected.  | Example: `{ backgroundColor: '#cce5ff', fontWeight: 'bold' }`.  |


### iFrame Example
- iFrame embedding
- Theme toggling
- Widget destruction
- Custom controls

## Copyright

© 2024-2025 Waii AI. All Rights Reserved.
