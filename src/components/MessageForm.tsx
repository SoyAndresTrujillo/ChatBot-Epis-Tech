import React, { useState } from 'react';

interface MessageFormProps {
    onSendMessage: (message: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-form">
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;
