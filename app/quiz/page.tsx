'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const mockQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correct: 1
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correct: 1
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correct: 3
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correct: 2
  },
  {
    question: 'What is the chemical formula for table salt?',
    options: ['NaCl', 'KCl', 'MgO', 'CaCl2'],
    correct: 0
  }
]

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<(number | null)[]>([...Array(mockQuestions.length)].fill(null))
  const [showResults, setShowResults] = useState(false)

  const current = mockQuestions[currentIndex]
  const userAnswer = answered[currentIndex]
  const isAnswered = userAnswer !== null
  const isCorrect = userAnswer === current.correct
  const progress = Math.round(((currentIndex + 1) / mockQuestions.length) * 100)

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return

    const newAnswered = [...answered]
    newAnswered[currentIndex] = index
    setAnswered(newAnswered)

    if (index === current.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setScore(0)
    setAnswered([...Array(mockQuestions.length)].fill(null))
    setShowResults(false)
  }

  if (showResults) {
    const percentage = Math.round((score / mockQuestions.length) * 100)
    
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">Here's how you did</p>
          </div>

          <Card className="mb-8 p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <p className="text-6xl font-bold text-primary mb-4">{percentage}%</p>
            <p className="text-2xl font-semibold text-foreground mb-2">
              You got {score} out of {mockQuestions.length} correct
            </p>
            <p className="text-muted-foreground mb-8">
              {percentage >= 80 && "Excellent work! You've mastered this topic."}
              {percentage >= 60 && percentage < 80 && "Good job! Review the questions you missed."}
              {percentage < 60 && "Keep studying! You'll improve with practice."}
            </p>
            <Button
              onClick={handleReset}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              size="lg"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Quiz
            </Button>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Review</h2>
            {mockQuestions.map((q, idx) => (
              <Card key={idx} className="p-6 border-l-4 border-l-transparent" style={{
                borderLeftColor: answered[idx] === q.correct ? '#8b5cf6' : '#ef4444'
              }}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {answered[idx] === q.correct ? (
                      <CheckCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-3">{q.question}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your answer: <span className="text-foreground font-medium">{q.options[answered[idx]!]}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Correct answer: <span className="text-primary font-medium">{q.options[q.correct]}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Quiz</h1>
          <p className="text-muted-foreground">Test your knowledge</p>
        </div>

        {/* Progress */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-sm font-semibold text-foreground">{progress}%</p>
          </div>
          <div className="w-full bg-border rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Card>

        {/* Question Counter */}
        <p className="text-sm text-muted-foreground mb-4">
          Question {currentIndex + 1} of {mockQuestions.length}
        </p>

        {/* Question */}
        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">{current.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {current.options.map((option, idx) => {
              const isSelected = userAnswer === idx
              const isCorrectOption = idx === current.correct

              let bgClass = 'bg-card hover:bg-muted/50 border-border hover:border-primary/30'
              
              if (isAnswered) {
                if (isCorrectOption) {
                  bgClass = 'bg-primary/10 border-primary'
                } else if (isSelected && !isCorrect) {
                  bgClass = 'bg-destructive/10 border-destructive'
                }
              } else if (isSelected) {
                bgClass = 'bg-primary/5 border-primary'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${bgClass} ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected && isAnswered && isCorrect
                        ? 'border-primary bg-primary'
                        : isSelected && isAnswered && !isCorrect
                        ? 'border-destructive bg-destructive'
                        : isCorrectOption && isAnswered
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}>
                      {isSelected && isAnswered && isCorrect && <CheckCircle className="h-4 w-4 text-white" />}
                      {isSelected && isAnswered && !isCorrect && <XCircle className="h-4 w-4 text-white" />}
                      {isCorrectOption && isAnswered && !isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <span className="text-lg font-medium text-foreground">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-primary/10 border border-primary text-primary'
                : 'bg-destructive/10 border border-destructive text-destructive'
            }`}>
              {isCorrect ? (
                <p className="font-semibold">Correct! Well done.</p>
              ) : (
                <p className="font-semibold">Incorrect. The correct answer is {current.options[current.correct]}</p>
              )}
            </div>
          )}
        </Card>

        {/* Navigation */}
        {isAnswered && (
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              {currentIndex === mockQuestions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          </div>
        )}

        {/* Score Display */}
        <div className="mt-8 flex justify-center">
          <Card className="p-4 inline-flex gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-3xl font-bold text-primary">{score}/{mockQuestions.length}</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
