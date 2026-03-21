'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/summary', label: 'Summary' },
    { href: '/flashcards', label: 'Flashcards' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/study-plan', label: 'Study Plan' },
    { href: '/chat', label: 'Chat' }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
            📚
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">AI Study Buddy</span>
          <span className="text-lg font-bold text-foreground sm:hidden">Buddy</span>
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button 
              key={item.href}
              variant={isActive(item.href) ? 'default' : 'ghost'} 
              asChild
              className={isActive(item.href) ? 'bg-primary text-primary-foreground' : ''}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border md:hidden px-4 py-3 space-y-1 bg-muted/30">
          {navItems.map((item) => (
            <Button 
              key={item.href}
              variant={isActive(item.href) ? 'default' : 'ghost'} 
              className={`w-full justify-start ${isActive(item.href) ? 'bg-primary text-primary-foreground' : ''}`} 
              asChild 
              onClick={() => setIsOpen(false)}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
      )}
    </nav>
  )
}
