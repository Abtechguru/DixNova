"use client"

import * as React from "react"
import { AIMessage } from "@/lib/ai/types"
import { AIMessageBubble } from "./AIMessageBubble"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Icons } from "@/lib/utils/icons"

export function AICopilotDrawer() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<AIMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am SmartMove AI Copilot. Ask me about corridor speed trends, fare yields, dataset quality, or executive recommendations.",
      timestamp: "Just now"
    }
  ])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: AIMessage = { role: "user", content: input, timestamp: new Date().toLocaleTimeString() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })

      const data = await res.json()
      if (data.success) {
        setMessages(prev => [
          ...prev,
          { role: "assistant", content: data.response.content, timestamp: new Date().toLocaleTimeString() }
        ])
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error connecting to AI service provider.", timestamp: new Date().toLocaleTimeString() }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-display font-semibold shadow-xl hover:scale-105 transition-all border border-primary/20"
      >
        <Icons.sparkles className="h-5 w-5" />
        <span>AI Copilot</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-card border-l border-surface shadow-2xl flex flex-col justify-between transition-all">
          {/* Header */}
          <div className="p-4 border-b border-surface flex items-center justify-between bg-surface/30">
            <div className="flex items-center gap-2">
              <Icons.sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-base">SmartMove AI Assistant</h3>
              <Badge variant="outline" className="text-[10px]">Provider-Agnostic</Badge>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-foreground-secondary hover:text-foreground p-1 rounded-lg"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, idx) => (
              <AIMessageBubble key={idx} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-foreground-secondary p-2">
                <Icons.loader className="h-4 w-4 animate-spin text-primary" />
                <span>AI Copilot is thinking...</span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-surface space-y-2 bg-surface/20">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Ask about traffic, fare box yield..."
                className="text-sm"
              />
              <Button onClick={handleSend} disabled={isLoading}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
