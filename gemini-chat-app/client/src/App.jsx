import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { sendChatMessage } from './services/api';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [conversations, setConversations] = useState([
    {
      id: 'default-chat',
      title: 'New Conversation',
      messages: []
    }
  ]);
  const [activeId, setActiveId] = useState('default-chat');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeId) || conversations[0];

  const handleNewChat = () => {
    const newId = `chat-${Date.now()}`;
    const newChat = {
      id: newId,
      title: 'New Conversation',
      messages: []
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveId(newId);
    setIsSidebarOpen(false);
  };

  const handleSelectConversation = (id) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  };

  const handleDeleteConversation = (id) => {
    setConversations((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        const fallbackId = `chat-${Date.now()}`;
        setActiveId(fallbackId);
        return [{ id: fallbackId, title: 'New Conversation', messages: [] }];
      }
      if (activeId === id) {
        setActiveId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleSendMessage = async (text) => {
    if (!text || isLoading) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    // Update conversation state with user message
    const updatedMessages = [...(activeConversation?.messages || []), userMessage];
    const newTitle = activeConversation?.messages.length === 0 ? text.slice(0, 30) + '...' : activeConversation.title;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, title: newTitle, messages: updatedMessages } : c
      )
    );

    setIsLoading(true);

    try {
      // Send conversation history to Express proxy server
      const response = await sendChatMessage(activeId, updatedMessages);

      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.reply,
        timestamp: Date.now()
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, assistantMessage] } : c
        )
      );
    } catch (err) {
      const errorMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'error',
        content: `⚠️ ${err.title || 'Error'}: ${err.message}`,
        timestamp: Date.now()
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, messages: [...c.messages, errorMessage] } : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-40 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={handleDeleteConversation}
        />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-zinc-950">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between p-3 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-xs font-semibold font-mono text-zinc-200">Gemini 3.6 Flash</span>
          <div className="w-5" />
        </header>

        {/* Chat Messages */}
        <ChatWindow messages={activeConversation?.messages || []} isLoading={isLoading} />

        {/* Message Input */}
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}
