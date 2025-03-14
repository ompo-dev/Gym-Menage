"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Users, DollarSign, Calendar, TrendingUp, Activity, UserPlus } from "lucide-react"
import { useState, useEffect } from "react"
import { Metadata } from "next"
import {
  AreaChartComponent,
  DonutChartComponent,
  MultipleBarChartComponent,
  StackedBarChartComponent,
  type AttendanceData,
  type PlanData,
  type WorkoutData,
  type RevenueData,
} from "@/components/charts"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, TooltipProps, ResponsiveContainer } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Format data for recharts
interface ChartDataPoint {
  month: string;
  value: number;
}

const formatChartData = (data: number[], labels: string[]): ChartDataPoint[] => {
  return labels.map((label: string, index: number) => ({
    month: label,
    value: data[index],
  }))
}

// Chart configurations
const revenueChartConfig = {
  value: {
    label: "Receita",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const clientsChartConfig = {
  value: {
    label: "Clientes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const attendanceChartConfig = {
  value: {
    label: "Frequência",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

// Sample data for attendance chart
const attendanceData = [
  { date: "2024-01", attendance: 120 },
  { date: "2024-02", attendance: 150 },
  { date: "2024-03", attendance: 180 },
  { date: "2024-04", attendance: 220 },
  { date: "2024-05", attendance: 250 },
  { date: "2024-06", attendance: 280 },
]

// Sample data for plans distribution
const plansData = [
  { name: "Mensal", value: 150 },
  { name: "Trimestral", value: 80 },
  { name: "Semestral", value: 50 },
  { name: "Anual", value: 20 },
]

// Sample data for workouts
const workoutsData = [
  { name: "Segunda", completed: 80, missed: 20 },
  { name: "Terça", completed: 85, missed: 15 },
  { name: "Quarta", completed: 90, missed: 10 },
  { name: "Quinta", completed: 75, missed: 25 },
  { name: "Sexta", completed: 70, missed: 30 },
]

// Sample data for revenue
const revenueData = [
  {
    month: "Jan",
    mensalidades: 50000,
    produtos: 15000,
    servicos: 8000,
  },
  {
    month: "Fev",
    mensalidades: 55000,
    produtos: 17000,
    servicos: 9000,
  },
  {
    month: "Mar",
    mensalidades: 58000,
    produtos: 18000,
    servicos: 10000,
  },
  {
    month: "Abr",
    mensalidades: 62000,
    produtos: 20000,
    servicos: 11000,
  },
  {
    month: "Mai",
    mensalidades: 65000,
    produtos: 22000,
    servicos: 12000,
  },
  {
    month: "Jun",
    mensalidades: 68000,
    produtos: 24000,
    servicos: 13000,
  },
]

// Add clients data array before the component
const clientsData = [180, 195, 200, 205, 210, 215, 220] // Example data for the last 7 months

// Add type definitions for tooltip props
type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      month: string;
      value: number;
    };
  }>;
  label?: string;
};

const CustomTooltip = ({ active, payload, config }: CustomTooltipProps & { config: ChartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {config.value.label}
            </span>
            <span className="font-bold">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [activeClients, setActiveClients] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [classesScheduled, setClassesScheduled] = useState(0)
  const [growthRate, setGrowthRate] = useState(0)

  // Labels for the charts
  const chartLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"]

  // Simulação de carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveClients(210)
      setMonthlyRevenue(23000)
      setClassesScheduled(48)
      setGrowthRate(12.5)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Dados simulados para próximas aulas
  const upcomingClasses = [
    { id: 1, name: "Musculação Avançada", instructor: "Carlos Silva", time: "14:00", attendees: 12 },
    { id: 2, name: "Pilates", instructor: "Ana Oliveira", time: "15:30", attendees: 8 },
    { id: 3, name: "Spinning", instructor: "Marcos Santos", time: "17:00", attendees: 15 },
    { id: 4, name: "Yoga", instructor: "Juliana Costa", time: "18:30", attendees: 10 },
  ]

  // Dados simulados para novos clientes
  const newClients = [
    { id: 1, name: "Mariana Alves", plan: "Mensal", joinDate: "15/03/2025" },
    { id: 2, name: "Ricardo Gomes", plan: "Anual", joinDate: "12/03/2025" },
    { id: 3, name: "Fernanda Lima", plan: "Trimestral", joinDate: "10/03/2025" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClients}</div>
            <p className="text-xs text-muted-foreground">+15 desde o último mês</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-100">
              <div className="h-1 rounded-full bg-primary" style={{ width: "85%" }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% desde o último mês</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-100">
              <div className="h-1 rounded-full bg-primary" style={{ width: "78%" }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aulas Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classesScheduled}</div>
            <p className="text-xs text-muted-foreground">Para os próximos 7 dias</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-100">
              <div className="h-1 rounded-full bg-primary" style={{ width: "65%" }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{growthRate}%</div>
            <p className="text-xs text-muted-foreground">Nos últimos 3 meses</p>
            <div className="mt-4 h-1 w-full rounded-full bg-gray-100">
              <div className="h-1 rounded-full bg-primary" style={{ width: "92%" }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
                <CardDescription>
                  Visão geral das métricas principais do seu negócio
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <StackedBarChartComponent
                  data={revenueData}
                  title="Receita por Categoria"
                  description="Distribuição de receita por tipo de serviço"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribuição</CardTitle>
                <CardDescription>
                  Distribuição de alunos por plano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChartComponent
                  data={plansData}
                  title="Distribuição de Planos"
                  description="Quantidade de alunos por tipo de plano"
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Frequência</CardTitle>
                <CardDescription>
                  Evolução da frequência de alunos ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChartComponent
                  data={attendanceData}
                  title="Frequência de Alunos"
                  description="Evolução da frequência ao longo dos meses"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Treinos</CardTitle>
                <CardDescription>
                  Distribuição de treinos realizados e perdidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MultipleBarChartComponent
                  data={workoutsData}
                  title="Treinos por Dia"
                  description="Treinos realizados e perdidos por dia da semana"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treinos por Modalidade</CardTitle>
              <CardDescription>Distribuição de alunos por tipo de treino e dia da semana</CardDescription>
            </CardHeader>
            <CardContent>
              <MultipleBarChartComponent 
                data={workoutsData}
                title="Treinos por Modalidade"
                description="Distribuição de alunos por tipo de treino e dia da semana"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Acesse os relatórios detalhados da sua academia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Relatório Financeiro",
                    description: "Receitas, despesas e lucro",
                    icon: <DollarSign className="h-5 w-5" />,
                  },
                  {
                    title: "Relatório de Clientes",
                    description: "Aquisição e retenção",
                    icon: <Users className="h-5 w-5" />,
                  },
                  {
                    title: "Relatório de Frequência",
                    description: "Horários de pico e utilização",
                    icon: <Activity className="h-5 w-5" />,
                  },
                ].map((report, index) => (
                  <Card key={index} className="flex flex-col items-center p-4 text-center">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">{report.icon}</div>
                    <h3 className="mt-3 font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <Button className="mt-4" variant="outline">
                      Visualizar
                    </Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

