"use client"

import { useState } from "react"
import { 
  LineChart, 
  Camera,
  Scale,
  Ruler,
  CalendarDays,
  TrendingUp,
  ChevronRight
} from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChartComponent } from "@/components/charts/area-chart"

// Dados simulados
const measurementsData = {
  latest: {
    date: "2024-03-14",
    weight: 75.5,
    bodyFat: 18,
    muscle: 35.2,
    measurements: {
      chest: 98,
      waist: 82,
      hips: 95,
      bicepsLeft: 32,
      bicepsRight: 32.5,
      thighLeft: 55,
      thighRight: 55.5
    }
  },
  history: {
    weight: [
      { date: "2024-02-14", attendance: 78 },
      { date: "2024-02-21", attendance: 77.2 },
      { date: "2024-02-28", attendance: 76.5 },
      { date: "2024-03-07", attendance: 76 },
      { date: "2024-03-14", attendance: 75.5 }
    ],
    bodyFat: [
      { date: "2024-02-14", attendance: 20 },
      { date: "2024-02-21", attendance: 19.5 },
      { date: "2024-02-28", attendance: 19 },
      { date: "2024-03-07", attendance: 18.5 },
      { date: "2024-03-14", attendance: 18 }
    ],
    muscle: [
      { date: "2024-02-14", attendance: 34 },
      { date: "2024-02-21", attendance: 34.3 },
      { date: "2024-02-28", attendance: 34.6 },
      { date: "2024-03-07", attendance: 34.9 },
      { date: "2024-03-14", attendance: 35.2 }
    ]
  },
  photos: [
    { date: "2024-03-14", front: "/photos/front-1.jpg", side: "/photos/side-1.jpg", back: "/photos/back-1.jpg" },
    { date: "2024-02-14", front: "/photos/front-2.jpg", side: "/photos/side-2.jpg", back: "/photos/back-2.jpg" }
  ]
}

const quickActions = [
  { 
    title: "Nova Medição", 
    description: "Registrar medidas atuais", 
    icon: Scale,
    color: "bg-primary text-primary-foreground"
  },
  { 
    title: "Fotos de Progresso", 
    description: "Adicionar novas fotos", 
    icon: Camera,
    color: "bg-muted hover:bg-muted/80"
  },
  { 
    title: "Ver Evolução", 
    description: "Análise completa", 
    icon: TrendingUp,
    color: "bg-muted hover:bg-muted/80"
  }
]

export default function MeasurementsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Medidas e Evolução</h1>
        <p className="text-muted-foreground">
          Acompanhe suas medidas e progresso físico
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Peso Atual</CardTitle>
            <CardDescription>Última medição: {measurementsData.latest.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{measurementsData.latest.weight}</div>
              <div className="text-sm text-muted-foreground">kg</div>
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-2">
              -2.5kg desde o início
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gordura Corporal</CardTitle>
            <CardDescription>Última medição: {measurementsData.latest.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{measurementsData.latest.bodyFat}</div>
              <div className="text-sm text-muted-foreground">%</div>
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-2">
              -2% desde o início
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Massa Muscular</CardTitle>
            <CardDescription>Última medição: {measurementsData.latest.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">{measurementsData.latest.muscle}</div>
              <div className="text-sm text-muted-foreground">kg</div>
            </div>
            <div className="text-sm text-green-600 dark:text-green-400 mt-2">
              +1.2kg desde o início
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="details">Medidas Detalhadas</TabsTrigger>
          <TabsTrigger value="photos">Fotos de Progresso</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Peso</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChartComponent
                  data={measurementsData.history.weight}
                  title="Evolução do Peso"
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Gordura Corporal</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AreaChartComponent
                    data={measurementsData.history.bodyFat}
                    title="Gordura Corporal"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Massa Muscular</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <AreaChartComponent
                    data={measurementsData.history.muscle}
                    title="Massa Muscular"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medidas Detalhadas</CardTitle>
              <CardDescription>Última atualização: {measurementsData.latest.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(measurementsData.latest.measurements).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <div className="font-medium">{value} cm</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fotos de Progresso</CardTitle>
              <CardDescription>Compare sua evolução</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {measurementsData.photos.map((photo) => (
                  <div key={photo.date} className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(photo.date).toLocaleDateString()}
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="aspect-square bg-muted rounded-lg" />
                      <div className="aspect-square bg-muted rounded-lg" />
                      <div className="aspect-square bg-muted rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 