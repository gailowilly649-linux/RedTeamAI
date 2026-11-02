import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Sparkles, Bot } from 'lucide-react';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new message or loading state
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col justify-between">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-4 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">Gemini 3.6 Flash</h2>
          <p className="text-sm text-zinc-400 max-w-sm mt-2">
            Ask questions, generate code, write docs, or brainstorm ideas powered by Google's latest Gemini model.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 max-w-lg w-full text-left">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
              💡 "Explain quantum computing in simple terms"
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
              💻 "Write a REST API in Node.js & Express"
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-zinc-800/40 pb-4">
          {messages.map((msg, index) => (
            <MessageBubble key={msg.id || index} message={msg} />
          ))}

          {/* Thinking / Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 px-4 py-4 md:px-6 bg-zinc-900/40 border-y border-zinc-800/40">
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse [animation-delay:200ms]"></span>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse [animation-delay:400ms]"></span>
                <span className="text-xs text-zinc-500 font-mono ml-2">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
