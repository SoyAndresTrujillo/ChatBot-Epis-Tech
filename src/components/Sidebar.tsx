import React from 'react';

interface SidebarProps {
    conversations: any[];
    setSelectedConversation: (index: number) => void;
    createNewConversation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ conversations, setSelectedConversation, createNewConversation }) => {
    return (
        <nav className="conversations">
            <button onClick={createNewConversation}>New Conversation</button>
            <ul>
                {conversations.map((conv, index) => (
                    <li key={index} onClick={() => setSelectedConversation(index)}>
                        {conv.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
