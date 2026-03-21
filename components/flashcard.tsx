'use client'

import { useState } from 'react'

interface FlashcardProps {
  question: string
  answer: string
  index: number
}

export function Flashcard({ question, answer, index }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer h-64 [perspective:1000px] group"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full p-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white flex flex-col items-center justify-center shadow-lg [backface-visibility:hidden]"
        >
          <div className="text-sm font-semibold opacity-75 mb-4">Question</div>
          <p className="text-center text-2xl font-bold leading-relaxed">{question}</p>
          <div className="mt-8 text-xs opacity-60">Click to reveal answer</div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full p-8 rounded-xl bg-gradient-to-br from-accent to-accent/80 text-accent-foreground flex flex-col items-center justify-center shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="text-sm font-semibold opacity-75 mb-4">Answer</div>
          <p className="text-center text-xl leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}
