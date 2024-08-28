import React from 'react';

interface MessageListProps {
    messages: any[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="messages">
            {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                    <div className="text">{msg.content}</div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
