import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import { ChatAIOptions } from '../models/ChatAIOptions';
import { ChatService } from '../services/ChatService';

const ChatAI: React.FC<ChatAIOptions> = ({ apiKey, model }) => {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

    useEffect(() => {
        // Load saved settings from localStorage or set defaults
        const settings = ChatService.getSettings();
        if (settings) {
            // Load settings if available
        }
    }, []);

    const handleSendMessage = (message: string) => {
        if (selectedConversation !== null) {
            ChatService.sendMessage(apiKey, model, message, conversations[selectedConversation])
                .then(response => {
                    // Handle response and update conversation
                });
        }
    };

    return (
        <div className="chat-ai">
            <Sidebar 
                conversations={conversations} 
                setSelectedConversation={setSelectedConversation} 
                createNewConversation={ChatService.createNewConversation} 
            />
            <div className="content">
                {selectedConversation !== null ? (
                    <>
                        <MessageList messages={conversations[selectedConversation].messages} />
                        <MessageForm onSendMessage={handleSendMessage} />
                    </>
                ) : (
                    <div className="welcome">Welcome to ChatAI!</div>
                )}
            </div>
        </div>
    );
};

export default ChatAI;
