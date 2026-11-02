import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function MessageInput({ onSend, isLoading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-3 md:p-4 bg-zinc-950 border-t border-zinc-800/60 max-w-4xl w-full mx-auto">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Gemini 3.6 Flash anything... (Shift+Enter for newline)"
          rows={1}
          disabled={isLoading}
          className="w-full pl-4 pr-12 py-3 bg-zinc-900 border border-zinc-800 focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl text-sm text-zinc-100 placeholder-zinc-500 outline-none resize-none overflow-y-auto max-h-44 transition-all"
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="absolute right-2.5 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 text-white disabled:text-zinc-600 transition-all shadow-md active:scale-95 disabled:scale-100"
          title="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-indigo-300" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </form>
      <div className="text-center mt-2 text-[11px] text-zinc-600 font-mono">
        Proxy Server Active · Responses powered by Gemini 3.6 Flash
      </div>
    </div>
  );
}
