'use client'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react'

const studyPlanData = [
  {
    week: 'Week 1',
    status: 'completed',
    tasks: [
      { name: 'Introduction to Biology', completed: true },
      { name: 'Cell Structure & Function', completed: true },
      { name: 'Quiz 1: Fundamentals', completed: true }
    ],
    progress: 100
  },
  {
    week: 'Week 2',
    status: 'completed',
    tasks: [
      { name: 'Photosynthesis', completed: true },
      { name: 'Cellular Respiration', completed: true },
      { name: 'Laboratory Work', completed: true }
    ],
    progress: 100
  },
  {
    week: 'Week 3',
    status: 'in-progress',
    tasks: [
      { name: 'Genetics & Heredity', completed: true },
      { name: 'DNA Replication', completed: false },
      { name: 'Practice Problems', completed: false }
    ],
    progress: 33
  },
  {
    week: 'Week 4',
    status: 'upcoming',
    tasks: [
      { name: 'Evolution & Natural Selection', completed: false },
      { name: 'Ecosystems', completed: false },
      { name: 'Final Review & Quiz', completed: false }
    ],
    progress: 0
  },
  {
    week: 'Week 5',
    status: 'upcoming',
    tasks: [
      { name: 'Advanced Topics', completed: false },
      { name: 'Case Studies', completed: false },
      { name: 'Capstone Project', completed: false }
    ],
    progress: 0
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'completed':
      return 'bg-primary/10 border-primary/20'
    case 'in-progress':
      return 'bg-accent/10 border-accent/20'
    default:
      return 'bg-muted/40 border-border'
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-primary" />
    case 'in-progress':
      return <Clock className="h-5 w-5 text-accent" />
    default:
      return <AlertCircle className="h-5 w-5 text-muted-foreground" />
  }
}

export default function StudyPlanPage() {
  const totalTasks = studyPlanData.reduce((acc, week) => acc + week.tasks.length, 0)
  const completedTasks = studyPlanData.reduce((acc, week) => acc + week.tasks.filter(t => t.completed).length, 0)
  const overallProgress = Math.round((completedTasks / totalTasks) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Study Plan</h1>
          <p className="text-muted-foreground">Your personalized learning roadmap</p>
        </div>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
            <p className="text-3xl font-bold text-primary">{overallProgress}%</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
            <p className="text-sm text-muted-foreground mb-2">Completed</p>
            <p className="text-3xl font-bold text-accent">{completedTasks}</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <p className="text-sm text-muted-foreground mb-2">In Progress</p>
            <p className="text-3xl font-bold text-secondary-foreground">
              {studyPlanData.find(w => w.status === 'in-progress')?.tasks.length || 0}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-muted to-muted/50">
            <p className="text-sm text-muted-foreground mb-2">Remaining</p>
            <p className="text-3xl font-bold text-muted-foreground">
              {totalTasks - completedTasks}
            </p>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-muted" />

          <div className="space-y-6">
            {studyPlanData.map((week, weekIdx) => (
              <div key={weekIdx} className="relative">
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-0 top-6">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full border-4 border-background flex items-center justify-center ${
                      week.status === 'completed' ? 'bg-primary' :
                      week.status === 'in-progress' ? 'bg-accent' :
                      'bg-muted'
                    }`}>
                      {getStatusIcon(week.status)}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <Card className={`md:ml-32 p-6 border-2 ${getStatusColor(week.status)}`}>
                  {/* Week Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{week.week}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${week.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-10 text-right">{week.progress}%</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="inline-block mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      week.status === 'completed' ? 'bg-primary text-primary-foreground' :
                      week.status === 'in-progress' ? 'bg-accent text-accent-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {week.status === 'completed' && 'Completed'}
                      {week.status === 'in-progress' && 'In Progress'}
                      {week.status === 'upcoming' && 'Upcoming'}
                    </span>
                  </div>

                  {/* Tasks */}
                  <div className="space-y-2">
                    {week.tasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          task.completed
                            ? 'bg-primary border-primary'
                            : 'border-border'
                        }`}>
                          {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm ${
                          task.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex gap-4 items-start">
            <TrendingUp className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">You're making great progress!</h3>
              <p className="text-muted-foreground mb-4">
                You've completed {completedTasks} tasks out of {totalTasks}. Keep up this pace and you'll finish your study plan ahead of schedule.
              </p>
              <div className="flex gap-3">
                <button className="text-sm font-semibold text-primary hover:underline">
                  View Recommendations →
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
