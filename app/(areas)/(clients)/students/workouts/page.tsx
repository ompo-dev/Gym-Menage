"use client"

import { useState } from "react"
import { 
  Dumbbell, 
  Calendar,
  Clock,
  ChevronRight,
  Play,
  BarChart,
  History,
  Timer
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChartComponent } from "@/components/charts/area-chart"

// Dados simulados
const workoutData = {
  current: {
    name: "Treino A - Superior",
    progress: 65,
    exercises: [
      { name: "Supino Reto", sets: 4, reps: "12", weight: "40kg", done: true },
      { name: "Puxada Frontal", sets: 4, reps: "12", weight: "35kg", done: true },
      { name: "Desenvolvimento", sets: 3, reps: "12", weight: "20kg", done: false },
      { name: "Rosca Direta", sets: 3, reps: "12", weight: "15kg", done: false },
      { name: "Extensão Triceps", sets: 3, reps: "12", weight: "15kg", done: false }
    ]
  },
  history: [
    { date: "2024-03-10", name: "Treino B - Inferior", duration: "45min" },
    { date: "2024-03-08", name: "Treino A - Superior", duration: "50min" },
    { date: "2024-03-06", name: "Treino C - Full Body", duration: "60min" }
  ],
  performance: [
    { date: "2024-02-14", attendance: 75 },
    { date: "2024-02-21", attendance: 80 },
    { date: "2024-02-28", attendance: 85 },
    { date: "2024-03-07", attendance: 82 },
    { date: "2024-03-14", attendance: 88 }
  ]
}

const quickActions = [
  { 
    title: "Iniciar Treino", 
    description: "Continue de onde parou", 
    icon: Play,
    color: "bg-primary text-primary-foreground"
  },
  { 
    title: "Ver Histórico", 
    description: "Treinos anteriores", 
    icon: History,
    color: "bg-muted hover:bg-muted/80"
  },
  { 
    title: "Desempenho", 
    description: "Análise e progresso", 
    icon: BarChart,
    color: "bg-muted hover:bg-muted/80"
  }
]

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState("current")

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
        <p className="text-muted-foreground">
          Acompanhe seus treinos e evolução
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn("group relative overflow-hidden", action.color)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-2 bg-background/10">
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Treino Atual</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{workoutData.current.name}</CardTitle>
                  <CardDescription>Em andamento</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">35min</span>
                  </div>
                  <Button>Continuar Treino</Button>
                </div>
              </div>
              <Progress value={workoutData.current.progress} className="mt-4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workoutData.current.exercises.map((exercise, index) => (
                  <div
                    key={exercise.name}
                    className={cn(
                      "flex items-center gap-4 rounded-lg border p-4",
                      exercise.done && "bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                      exercise.done && "bg-primary text-primary-foreground border-0"
                    )}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.sets} séries x {exercise.reps} reps • {exercise.weight}
                      </div>
                    </div>
                    {exercise.done && (
                      <div className="text-sm text-muted-foreground">Concluído</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Treinos</CardTitle>
              <CardDescription>Seus últimos treinos realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workoutData.history.map((workout) => (
                  <div
                    key={workout.date}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Dumbbell className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{workout.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(workout.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workout.duration}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Desempenho</CardTitle>
              <CardDescription>Progresso nas últimas semanas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChartComponent
                  data={workoutData.performance}
                  title="Desempenho nos Treinos"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 