import React from 'react';
import { User, Sparkles } from 'lucide-react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  return (
    <div className={`flex gap-3 px-4 py-4 md:px-6 transition-colors ${
      isUser ? 'bg-transparent' : isError ? 'bg-red-950/20 border-y border-red-900/30' : 'bg-zinc-900/40 border-y border-zinc-800/40'
    }`}>
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <User className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-indigo-400 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold tracking-wide text-zinc-300">
            {isUser ? 'You' : 'Gemini AI (3.6 Flash)'}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        <div className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isError ? 'text-red-400 font-mono' : isUser ? 'text-zinc-100 font-sans' : 'text-zinc-200 font-sans'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
