import React from 'react';
import ChatAI from './components/ChatAI';

const App: React.FC = () => {
    return (
        <ChatAI 
            apiKey="" 
            model="gpt-3.5-turbo" 
        />
    );
};

export default App;