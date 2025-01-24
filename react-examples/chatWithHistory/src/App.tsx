import React, { useState, useRef, useCallback } from 'react';
import { WaiiChat, WaiiChatHistory } from '@waii-ai/widgets';
import { ChatResponse, ChatRequest } from 'waii-sdk-js/dist/clients/chat/src/Chat';
import { GeneratedChatHistoryEntry } from 'waii-sdk-js/dist/clients/history/src/History';
import { Spin } from 'antd';

interface ChatRef {
  sendMessageExternal: (message: string | number , updated_manual_query: string | number | null) => void;
}

const CombinedChatInterface: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<GeneratedChatHistoryEntry[]>([]);
  const chatRef = useRef<ChatRef | null>(null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | number | null>(null);
  const [currentChatGroup, setCurrentChatGroup] = useState<GeneratedChatHistoryEntry[]>([]);
  const [chatParentUuid, setChatParentUuid] = useState<string | null>(null);

  const handleSessionSelect = useCallback((
    sessionId: string, 
    group?: GeneratedChatHistoryEntry[]
  ) => {
    setSelectedSessionId(sessionId);
    
    if (group && group.length > 0) {
      setCurrentChatGroup(group);
      const lastMessage = group[group.length - 1];
      if (lastMessage.response?.chat_uuid) {
        setChatParentUuid(lastMessage.response.chat_uuid);
      }
      
    } else {
      setCurrentChatGroup([]);
      setChatParentUuid(null);
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
    backgroundColor: '#ffffff'
  };

  const chatStyle: React.CSSProperties = {
    flex: 1,
    height: '100%'
  };

  function handleChatResponse(response: any, requestWithResponse: any): void {

    if(!requestWithResponse)
      return
    console.log(response)
    // if(!response)
    //   return
    // setChatHistory([...chatHistory, response])

    setChatHistory(prevState => {
      const oldHistory = prevState || [];
      const newHistory = [...requestWithResponse.history].reverse();
      return {
        ...prevState,
        history: [...newHistory, ...oldHistory]
      };
    });
  }

  return (
    <div style={containerStyle}>
      <div style={historyStyle}>
        <WaiiChatHistory
          apiUrl="<api url>"
          apiKey="<api key>"
          databaseKey="<db key>"
          history={chatHistory}
          onSessionSelect={handleSessionSelect}
          isDarkMode={false}
          showSearch={true}
          loadingComponent={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spin/>
            </div>
          }
          initialDisplayCount={4}
          maxHeight="70vh"
        />
      </div>
      
      <div style={chatStyle}>
        <WaiiChat
          apiUrl="<api url>"
          apiKey="<api key>"
          databaseKey="<db key>"
          ref={chatRef}
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