import React from 'react';
import { WaiiChat } from '@waii-ai/widgets';

const App: React.FC = () => {
  return (
    <div className="app" style={{ maxWidth: '800px' }}>
      <h1>Waii Chat Widget - React Example</h1>
      <p>The chat widget should appear below.</p>

      <div style={{ height: '600px', width: '100%' }}>
        <WaiiChat
          apiKey="<your api key>"
          databaseKey="<your database key>"
          theme="light"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default App;