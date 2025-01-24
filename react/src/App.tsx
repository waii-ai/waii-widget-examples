import React, { useState, useRef } from 'react';
import { WaiiChat, WaiiChatHistory } from '@waii-ai/widgets';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatRef = useRef<any>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const handleChatResponse = (response: any) => {
    if (!response) return;
    
    const newHistory = [...chatHistory];
    const existingIndex = newHistory.findIndex(h => h.id === response.chat_uuid);
    
    if (existingIndex === -1) {
      newHistory.unshift({
        id: response.chat_uuid,
        summary: response.response?.slice(0, 100) + '...',
        messageCount: 2, // Initial question + response
        timestamp: new Date().toISOString()
      });
      setChatHistory(newHistory);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setSelectedChat(sessionId);
    if (chatRef.current) {
      chatRef.current.loadChat(sessionId);
    }
  };

  return (
    <div className="app" style={{ maxWidth: '800px' }}>
      <h1>Waii Chat Widget - React Example</h1>
      <p>The chat widget should appear below.</p>

      <div style={{ display: 'flex', gap: '20px', height: '600px' }}>
        <WaiiChatHistory
          history={chatHistory}
          onSessionSelect={handleSessionSelect}
          style={{ width: '300px' }}
          isDarkMode={false}
        />
        
        <div style={{ flex: 1 }}>
          <WaiiChat
            ref={chatRef}
            apiKey="<your api key>"
            databaseKey="<your database key>"
            theme="light"
            style={{ height: '100%' }}
            handleChatResponse={handleChatResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;