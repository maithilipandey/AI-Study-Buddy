'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, TrendingUp, Zap, Award } from 'lucide-react'

const summaryData = {
  documents: [
    { name: 'Biology Textbook Chapter 3', pages: 24, summary: 'Overview of cellular structures and their functions. Key topics include mitochondria, cell nucleus, and protein synthesis.' },
    { name: 'Photosynthesis Notes', pages: 12, summary: 'Detailed explanation of light-dependent and light-independent reactions, including the Calvin cycle.' },
    { name: 'Genetics Study Guide', pages: 18, summary: 'Comprehensive guide covering DNA replication, gene expression, and inheritance patterns.' }
  ],
  keyTopics: [
    { topic: 'Cell Structure', importance: 95, documents: 2 },
    { topic: 'Energy Production', importance: 88, documents: 2 },
    { topic: 'Genetics', importance: 92, documents: 1 },
    { topic: 'Photosynthesis', importance: 85, documents: 1 },
    { topic: 'Protein Synthesis', importance: 78, documents: 1 }
  ],
  stats: {
    totalPages: 54,
    studyHours: 12.5,
    flashcards: 48,
    quizzesCompleted: 3,
    averageScore: 85
  }
}

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Summary</h1>
          <p className="text-muted-foreground">Key insights from your study materials</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          <Card className="p-4">
            <BookOpen className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Total Pages</p>
            <p className="text-2xl font-bold text-foreground">{summaryData.stats.totalPages}</p>
          </Card>
          <Card className="p-4">
            <Clock className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Study Hours</p>
            <p className="text-2xl font-bold text-foreground">{summaryData.stats.studyHours}h</p>
          </Card>
          <Card className="p-4">
            <Zap className="h-5 w-5 text-secondary-foreground mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Flashcards</p>
            <p className="text-2xl font-bold text-foreground">{summaryData.stats.flashcards}</p>
          </Card>
          <Card className="p-4">
            <TrendingUp className="h-5 w-5 text-primary mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Quizzes Completed</p>
            <p className="text-2xl font-bold text-foreground">{summaryData.stats.quizzesCompleted}</p>
          </Card>
          <Card className="p-4">
            <Award className="h-5 w-5 text-accent mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
            <p className="text-2xl font-bold text-foreground">{summaryData.stats.averageScore}%</p>
          </Card>
        </div>

        {/* Key Topics Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Topics Identified</h2>
          <div className="space-y-4">
            {summaryData.keyTopics.map((item, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{item.topic}</h3>
                  <span className="text-sm font-bold text-primary px-3 py-1 rounded-full bg-primary/10">
                    {item.importance}% Importance
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                    style={{ width: `${item.importance}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Found in {item.documents} document{item.documents !== 1 ? 's' : ''}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Document Summaries */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Document Summaries</h2>
          <div className="space-y-4">
            {summaryData.documents.map((doc, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">{doc.name}</h3>
                  <span className="text-sm text-muted-foreground bg-muted/40 px-3 py-1 rounded-full">
                    {doc.pages} pages
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{doc.summary}</p>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="/chat">Ask Questions</a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/flashcards">Create Flashcards</a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recommendations</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p className="text-muted-foreground">Focus more on Genetics concepts, as they appear frequently in your materials.</p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p className="text-muted-foreground">Review Cell Structure fundamentals before moving to advanced topics.</p>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p className="text-muted-foreground">Create more practice quizzes to reinforce your understanding of Energy Production.</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
