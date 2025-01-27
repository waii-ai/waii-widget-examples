import React, { useState, useRef, useCallback } from 'react';
import { WaiiChat, WaiiChatHistory } from '@waii-ai/widgets';
import { ChatResponse, ChatRequest } from 'waii-sdk-js/dist/clients/chat/src/Chat';
import { GeneratedChatHistoryEntry } from 'waii-sdk-js/dist/clients/history/src/History';
import { Button, Spin } from 'antd';
import { WaiiChatHandle } from '@waii-ai/widgets/dist/types/components/Chat/types';
import '../../../config.js';

interface ChatRef {
  sendMessageExternal: (message: string | number , updated_manual_query: string | number | null) => void;
}

const CombinedChatInterface: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<GeneratedChatHistoryEntry[]>([]);
  const chatRef = useRef<WaiiChatHandle>(null);
  const [currentChatGroup, setCurrentChatGroup] = useState<GeneratedChatHistoryEntry[]>([]);
  // @ts-ignore
  const { configs } = window;
  console.log(configs);

  const newSessionHandler = () =>{
    chatRef.current?.clearChat();
  }

  const handleSessionSelect = useCallback((
    sessionId: string, 
    group?: GeneratedChatHistoryEntry[]
  ) => {    

    if (group && group.length > 0) {
      setCurrentChatGroup(group);
    } else {
      setCurrentChatGroup([]);
    }

  }, []);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    height: '100vh',
    width: '100%',
    backgroundColor: '#f5f5f5'
  };

  const historyStyle: React.CSSProperties = {
    width: '300px',
    borderRight: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column'
  };

  const chatStyle: React.CSSProperties = {
    flex: 1,
    height: '100%'
  };

  function handleChatResponse(response: any, requestWithResponse: any): void {

    if(!requestWithResponse)
      return

    setChatHistory(prevState => {
      const oldHistory = prevState || [];
      const newHistory = [...requestWithResponse.history].reverse();
      return  [...newHistory, ...oldHistory];
    });
  }

  return (
    <div style={containerStyle}>
      <div style={historyStyle}>
        <WaiiChatHistory
          apiUrl={configs.apiUrl}
          apiKey={configs.apiKey}
          databaseKey={configs.databaseKey}
          history={chatHistory}
          onSessionSelect={handleSessionSelect}
          isDarkMode={false}
          showSearch={true}
          initialDisplayCount={4}
          maxHeight="70vh"
          showNewChat={true}
          onLoadHistory={(history: GeneratedChatHistoryEntry[]) => {
            setChatHistory(history)
          }}
          onNewChat={newSessionHandler}
        />
      </div>
      
      <div style={chatStyle}>
        <WaiiChat
          apiUrl={configs.apiUrl}
          apiKey={configs.apiKey}
          databaseKey={configs.databaseKey}
               ref={chatRef}
          chatStyles={{container : {
            width : "100"
          }}}
          chatHistoryList={currentChatGroup? currentChatGroup: []}
          handleChatResponse={handleChatResponse}
          theme="light"
          className="chat-container"
          botName="Assistant"

        />
      </div>
    </div>
  );
};

export default CombinedChatInterface;