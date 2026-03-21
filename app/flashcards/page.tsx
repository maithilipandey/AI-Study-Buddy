'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Flashcard } from '@/components/flashcard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'

const mockFlashcards = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris'
  },
  {
    question: 'What is the chemical symbol for Gold?',
    answer: 'Au'
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    answer: 'William Shakespeare'
  },
  {
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter'
  },
  {
    question: 'What is the square root of 144?',
    answer: '12'
  },
  {
    question: 'In what year did World War II end?',
    answer: '1945'
  }
]

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mastered, setMastered] = useState<number[]>([])
  const [learning, setLearning] = useState<number[]>([])

  const current = mockFlashcards[currentIndex]
  const progress = Math.round(((currentIndex + 1) / mockFlashcards.length) * 100)

  const handleNext = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleMastered = () => {
    if (!mastered.includes(currentIndex)) {
      setMastered([...mastered, currentIndex])
    }
    handleNext()
  }

  const handleLearning = () => {
    if (!learning.includes(currentIndex)) {
      setLearning([...learning, currentIndex])
    }
    handleNext()
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setMastered([])
    setLearning([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Master your concepts with interactive cards</p>
        </div>

        {/* Progress */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
              <p className="text-3xl font-bold text-foreground">{progress}%</p>
            </div>
            <div className="flex gap-4 text-right">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mastered</p>
                <p className="text-2xl font-bold text-primary">{mastered.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Learning</p>
                <p className="text-2xl font-bold text-accent">{learning.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                <p className="text-2xl font-bold text-muted-foreground">
                  {mockFlashcards.length - mastered.length - learning.length}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Flashcard */}
        <div className="mb-8">
          <Flashcard
            question={current.question}
            answer={current.answer}
            index={currentIndex}
          />
        </div>

        {/* Card Counter */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {mockFlashcards.length}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center mb-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            size="lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleLearning}
              className="border-accent text-accent hover:bg-accent/10"
            >
              Still Learning
            </Button>
            <Button
              onClick={handleMastered}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Mastered
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === mockFlashcards.length - 1}
            size="lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Reset Button */}
        {currentIndex === mockFlashcards.length - 1 && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">Mastered Cards</h3>
            <div className="space-y-2">
              {mastered.length > 0 ? (
                mastered.map(idx => (
                  <div key={idx} className="text-sm text-muted-foreground">
                    ✓ {mockFlashcards[idx].question}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Mark cards as mastered to see them here</p>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-accent/5 border-accent/20">
            <h3 className="text-lg font-semibold text-foreground mb-3">Learning Cards</h3>
            <div className="space-y-2">
              {learning.length > 0 ? (
                learning.map(idx => (
                  <div key={idx} className="text-sm text-muted-foreground">
                    ⚡ {mockFlashcards[idx].question}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Cards you're still learning will appear here</p>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
