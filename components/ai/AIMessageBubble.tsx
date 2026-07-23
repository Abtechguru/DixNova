import * as React from "react"
import { AIMessage } from "@/lib/ai/types"

interface AIMessageBubbleProps {
  message: AIMessage
}

export function AIMessageBubble({ message }: AIMessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div 
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-surface border border-surface text-foreground rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap leading-relaxed font-sans">{message.content}</div>
        {message.timestamp && (
          <span className="block text-[10px] opacity-60 text-right mt-1 font-mono">
            {message.timestamp}
          </span>
        )}
      </div>
    </div>
  )
}
