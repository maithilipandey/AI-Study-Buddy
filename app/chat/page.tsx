'use client'

import { useState, useRef, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Send, Plus, Zap } from 'lucide-react'

const mockResponses: { [key: string]: string } = {
  'hello': 'Hello! I\'m your AI Study Buddy. I\'m here to help you understand your study materials and answer any questions you have.',
  'what is photosynthesis': 'Photosynthesis is a process used by plants to convert light energy into chemical energy that can be later released to fuel the plant\'s activities. It\'s divided into two stages: the light-dependent reactions in the thylakoid and the light-independent reactions (Calvin cycle) in the stroma.',
  'explain mitochondria': 'Mitochondria are often called the "powerhouse of the cell" because they generate energy through cellular respiration. They convert glucose and oxygen into ATP, the energy currency of the cell. Each mitochondrion has two membranes and contains its own DNA.',
  'what is dna': 'DNA (deoxyribonucleic acid) is a molecule that carries genetic instructions for all living organisms. It consists of two strands forming a double helix structure, made up of nucleotides containing a sugar, phosphate group, and nitrogenous base.',
  'default': 'That\'s an interesting question! Based on your study materials, I can help you explore this topic further. Could you provide more context or ask a more specific question?'
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  for (const key in mockResponses) {
    if (lowerMessage.includes(key)) {
      return mockResponses[key]
    }
  }
  return mockResponses['default']
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Study Buddy. Ask me anything about your study materials - I\'m here to help you learn better! 📚'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const response = getMockResponse(userMessage)
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const suggestedQuestions = [
    'Explain photosynthesis',
    'What is DNA?',
    'Tell me about mitochondria'
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Chat</h1>
          <p className="text-muted-foreground">Ask questions about your study materials</p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 p-6 flex flex-col border-primary/20 mb-6">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && !isLoading && (
            <div className="mb-6">
              <p className="text-xs text-muted-foreground mb-3 uppercase font-semibold">Suggested Questions</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(q)
                    }}
                    className="p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left text-sm font-medium text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your study materials..."
              disabled={isLoading}
              className="flex-1 border-border"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <Zap className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Pro Tip</p>
            <p className="text-sm text-foreground">Ask specific questions about your materials for better answers.</p>
          </Card>
          <Card className="p-4 bg-accent/5 border-accent/20">
            <Zap className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Usage</p>
            <p className="text-sm text-foreground">You have unlimited questions with your study buddy.</p>
          </Card>
          <Card className="p-4 bg-secondary/5 border-secondary/20">
            <Zap className="h-5 w-5 text-secondary-foreground mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Learn More</p>
            <p className="text-sm text-foreground">Combine chat with flashcards and quizzes for best results.</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
