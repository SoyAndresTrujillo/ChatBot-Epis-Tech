import React from 'react';
import ChatAI from './components/ChatAI';

const App: React.FC = () => {
    return (
        <ChatAI 
            apiKey="sk-M58GoedUve5BgYfcjCfEh4Avb5lgY3rLAO61GjXtx9T3BlbkFJYJnRuc2AmBMRw4wnhS7bTGRyQgA3q-zi6WsAx_yM4A" 
            model="gpt-3.5-turbo" 
        />
    );
};

export default App;
