'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, BookOpen, MessageSquare, BarChart3, Zap, Clock } from 'lucide-react'

export default function Dashboard() {
  const [isDragActive, setIsDragActive] = useState(false)
  const [files, setFiles] = useState<string[]>([])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => f.name)
      setFiles([...files, ...newFiles])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => f.name)
      setFiles([...files, ...newFiles])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground text-lg">Upload your study materials and let AI help you learn smarter</p>
        </div>

        {/* Upload Section */}
        <Card className="mb-12 p-8 border-2">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-xl border-2 border-dashed transition-all ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="mb-4 p-4 rounded-full bg-secondary/20">
                <Upload className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Upload Study Materials</h2>
              <p className="text-muted-foreground mb-6 text-center">
                Drop PDF, Word, or image files here, or click to browse
              </p>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
              />
              <Button 
                onClick={() => document.getElementById('file-input')?.click()}
                className="bg-accent hover:bg-accent/90 text-accent-foreground cursor-pointer"
              >
                Choose Files
              </Button>
            </div>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Uploaded Files</h3>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                    <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground flex-1 truncate">{file}</span>
                    <span className="text-xs text-muted-foreground">Processing...</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 inline-block p-3 rounded-lg bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ask questions about your study materials and get instant answers
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/chat">Start Chatting</a>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 inline-block p-3 rounded-lg bg-accent/10">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Flashcards</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate and master flashcards with spaced repetition
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/flashcards">Learn More</a>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 inline-block p-3 rounded-lg bg-secondary/20">
              <BarChart3 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor your learning progress with detailed analytics
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/study-plan">View Progress</a>
            </Button>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Documents Uploaded</p>
            <p className="text-2xl font-bold text-primary">{files.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Study Hours</p>
            <p className="text-2xl font-bold text-accent">12.5h</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Flashcards Mastered</p>
            <p className="text-2xl font-bold text-secondary-foreground">48</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
            <p className="text-2xl font-bold text-foreground">7 days</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
