"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Users, DollarSign, Calendar } from "lucide-react"
import * as React from "react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Label as RechartsLabel, Tooltip } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Payload } from "recharts/types/component/DefaultTooltipContent"

// Define types for the data structures
type TimeRange = 'week' | 'month' | 'year'

interface ChartDataPoint {
  month: string
  value: number
}

interface BarDataPoint {
  name: string
  value: number
}

interface PieDataPoint {
  name: string
  value: number
  fill: string
}

// Type definitions for the data structures
interface DataByTimeRange {
  week: number[]
  month: number[]
  year: number[]
}

interface TimeRangeLabels {
  week: string[]
  month: string[]
  year: string[]
}

interface TooltipData {
  value: number
  name: string
  color: string
  dataKey: string
}

type TooltipPayload = {
  value: number | string | undefined
  name?: string
  color?: string
  dataKey?: string | number
  payload?: {
    value: number | string
    name: string
  }
}

// Format data for recharts with proper types
const formatChartData = (data: number[], labels: string[]): ChartDataPoint[] => {
  return labels.map((label, index) => ({
    month: label,
    value: data[index],
  }))
}

// Format bar data for recharts with proper types
const formatBarData = (data: number[], labels: string[]): BarDataPoint[] => {
  return labels.map((label, index) => ({
    name: label,
    value: data[index],
  }))
}

// Format pie chart data with proper types
const formatPieData = (data: number[], labels: string[]): PieDataPoint[] => {
  return data.map((value, index) => ({
    name: labels[index],
    value: value,
    fill: `var(--color-${index + 1})`,
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

const classPopularityConfig = {
  value: {
    label: "Alunos",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const peakHoursConfig = {
  value: {
    label: "Frequência",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// Plan distribution pie chart config
const planDistributionConfig = {
  value: {
    label: "Clientes",
  },
  "0": {
    label: "Mensal",
    color: "hsl(var(--chart-1))",
  },
  "1": {
    label: "Trimestral",
    color: "hsl(var(--chart-2))",
  },
  "2": {
    label: "Semestral",
    color: "hsl(var(--chart-3))",
  },
  "3": {
    label: "Anual",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("month")

  // Dados simulados para os gráficos com tipos apropriados
  const revenueData: DataByTimeRange = {
    week: [3500, 4200, 3800, 4500, 5100, 4900, 5300],
    month: [12000, 15000, 13500, 17000, 21000, 19500, 23000],
    year: [120000, 135000, 142000, 156000, 170000, 185000, 210000],
  }

  const clientsData: DataByTimeRange = {
    week: [180, 185, 190, 195, 200, 205, 210],
    month: [150, 160, 170, 180, 190, 200, 210],
    year: [100, 120, 140, 160, 180, 195, 210],
  }

  const attendanceData: DataByTimeRange = {
    week: [75, 82, 68, 90, 85, 78, 92],
    month: [350, 420, 380, 450, 510, 490, 530],
    year: [4200, 4500, 4800, 5100, 5400, 5700, 6000],
  }

  const classPopularityData = [25, 18, 15, 12, 10]
  const classPopularityLabels = ["Spinning", "Musculação", "Yoga", "Pilates", "Funcional"]

  const peakHoursData = [5, 8, 12, 20, 25, 30, 35, 40, 38, 30, 25, 15, 10, 8, 5]
  const peakHoursLabels = [
    "6h",
    "7h",
    "8h",
    "9h",
    "10h",
    "11h",
    "12h",
    "13h",
    "14h",
    "15h",
    "16h",
    "17h",
    "18h",
    "19h",
    "20h",
  ]

  const timeRangeLabels: TimeRangeLabels = {
    week: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
    year: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  }

  const revenueChartData = formatChartData(revenueData[timeRange], timeRangeLabels[timeRange])
  const clientsChartData = formatChartData(clientsData[timeRange], timeRangeLabels[timeRange])
  const attendanceChartData = formatChartData(attendanceData[timeRange], timeRangeLabels[timeRange])
  const classPopularityChartData = formatBarData(classPopularityData, classPopularityLabels)
  const peakHoursChartData = formatBarData(peakHoursData, peakHoursLabels)

  const planDistributionData = [35, 25, 15, 25]
  const planDistributionLabels = ["Mensal", "Trimestral", "Semestral", "Anual"]
  const planDistributionPieData = formatPieData(planDistributionData, planDistributionLabels)

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const renderTooltip = (
    active: boolean | undefined,
    payload: TooltipPayload[] | undefined,
    label: string | undefined,
    config: ChartConfig,
    formatter?: (value: number) => string
  ) => {
    if (!active || !payload?.length) return null

    const formattedPayload = payload.map(item => ({
      value: typeof item.value === 'string' ? parseFloat(item.value) : (item.value || 0),
      name: item.name || '',
      color: item.color || '',
      dataKey: String(item.dataKey || '')
    }))

    return (
      <ChartTooltip
        active={active}
        payload={formattedPayload}
        label={label}
        config={config}
        formatter={formatter}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <div className="flex items-center space-x-2">
          <Select 
            value={timeRange} 
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Últimos 7 Meses</SelectItem>
              <SelectItem value="year">Últimos 7 Anos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="classes">Aulas</TabsTrigger>
          <TabsTrigger value="attendance">Frequência</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receita</CardTitle>
              <CardDescription>Análise da receita ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={revenueChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={formatChartData(revenueData[timeRange], timeRangeLabels[timeRange])}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip<number, string>
                    content={({ active, payload, label }) => 
                      renderTooltip(active, payload as TooltipPayload[], label, revenueChartConfig, formatCurrency)
                    }
                  />
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="var(--color-value)"
                    fillOpacity={0.4}
                    stroke="var(--color-value)"
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">
                    R$ {revenueData[timeRange][revenueData[timeRange].length - 1].toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Período Atual</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    R$ {revenueData[timeRange][revenueData[timeRange].length - 2].toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Período Anterior</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    +
                    {Math.round(
                      ((revenueData[timeRange][revenueData[timeRange].length - 1] -
                        revenueData[timeRange][revenueData[timeRange].length - 2]) /
                        revenueData[timeRange][revenueData[timeRange].length - 2]) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Crescimento</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receita por Plano</CardTitle>
                <CardDescription>Porcentagem da receita por tipo de plano</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={planDistributionConfig}>
                  <PieChart>
                    <Tooltip
                      content={({ active, payload, label }) => 
                        renderTooltip(active, payload as TooltipPayload[], label, planDistributionConfig)
                      }
                    />
                    <Pie
                      data={formatPieData([95, 45, 20, 50], ["Mensal", "Trimestral", "Semestral", "Anual"])}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      strokeWidth={5}
                    />
                  </PieChart>
                </ChartContainer>
                <div className="mt-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                      <span className="text-sm">Mensal (95)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                      <span className="text-sm">Trimestral (45)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                      <span className="text-sm">Semestral (20)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-4))]"></div>
                      <span className="text-sm">Anual (50)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status de Pagamentos</CardTitle>
                <CardDescription>Visão geral dos pagamentos do mês atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Pagamentos Recebidos</p>
                      <p className="text-2xl font-bold">R$ 18.500,00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Pagamentos Pendentes</p>
                      <p className="text-2xl font-bold">R$ 3.200,00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                      <DollarSign className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Pagamentos Atrasados</p>
                      <p className="text-2xl font-bold">R$ 1.300,00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crescimento de Clientes</CardTitle>
              <CardDescription>Evolução do número de clientes ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={clientsChartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={formatChartData(clientsData[timeRange], timeRangeLabels[timeRange])}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip<number, string>
                    content={({ active, payload, label }) => 
                      renderTooltip(active, payload as TooltipPayload[], label, clientsChartConfig, formatCurrency)
                    }
                  />
                  <Area
                    dataKey="value"
                    type="natural"
                    fill="var(--color-value)"
                    fillOpacity={0.4}
                    stroke="var(--color-value)"
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">{clientsData[timeRange][clientsData[timeRange].length - 1]}</div>
                  <div className="text-xs text-muted-foreground">Total Atual</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {clientsData[timeRange][clientsData[timeRange].length - 1] -
                      clientsData[timeRange][clientsData[timeRange].length - 2]}
                  </div>
                  <div className="text-xs text-muted-foreground">Novos Clientes</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    +
                    {Math.round(
                      ((clientsData[timeRange][clientsData[timeRange].length - 1] -
                        clientsData[timeRange][clientsData[timeRange].length - 2]) /
                        clientsData[timeRange][clientsData[timeRange].length - 2]) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Crescimento</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Plano</CardTitle>
                <CardDescription>Número de clientes por tipo de plano</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Plano Mensal</Label>
                      <span className="font-medium">95 clientes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Plano Trimestral</Label>
                      <span className="font-medium">45 clientes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "21%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Plano Semestral</Label>
                      <span className="font-medium">20 clientes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Plano Anual</Label>
                      <span className="font-medium">50 clientes</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "24%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retenção de Clientes</CardTitle>
                <CardDescription>Análise de retenção e rotatividade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500">
                      <Users className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Taxa de Retenção</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500">
                      <Users className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Taxa de Cancelamento</p>
                      <p className="text-2xl font-bold">15%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Tempo Médio de Permanência</p>
                      <p className="text-2xl font-bold">8 meses</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Popularidade das Aulas</CardTitle>
                <CardDescription>Aulas mais populares por número de alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={classPopularityConfig}>
                  <BarChart
                    accessibilityLayer
                    data={formatBarData(classPopularityData, classPopularityLabels)}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                    <Tooltip<number, string>
                      content={({ active, payload, label }) => 
                        renderTooltip(active, payload as TooltipPayload[], label, classPopularityConfig)
                      }
                    />
                    <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Ocupação</CardTitle>
                <CardDescription>Porcentagem de ocupação das aulas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Spinning</Label>
                      <span className="font-medium">90%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "90%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Musculação</Label>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Yoga</Label>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "75%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Pilates</Label>
                      <span className="font-medium">80%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequência</CardTitle>
              <CardDescription>Número de alunos presentes nas aulas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={attendanceChartConfig}>
                <AreaChart data={formatChartData(attendanceData[timeRange], timeRangeLabels[timeRange])}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <Tooltip<number, string>
                    content={({ active, payload, label }) => 
                      renderTooltip(active, payload as TooltipPayload[], label, attendanceChartConfig)
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--chart-3))" 
                    fill="hsl(var(--chart-3) / 0.3)" 
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold">
                    {attendanceData[timeRange][attendanceData[timeRange].length - 1]}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Atual</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {attendanceData[timeRange][attendanceData[timeRange].length - 1] -
                      attendanceData[timeRange][attendanceData[timeRange].length - 2]}
                  </div>
                  <div className="text-xs text-muted-foreground">Variação</div>
                </div>
                <div>
                  <div className="text-xl font-bold">
                    +
                    {Math.round(
                      ((attendanceData[timeRange][attendanceData[timeRange].length - 1] -
                        attendanceData[timeRange][attendanceData[timeRange].length - 2]) /
                        attendanceData[timeRange][attendanceData[timeRange].length - 2]) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-xs text-muted-foreground">Crescimento</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horários de Pico</CardTitle>
              <CardDescription>Horários com maior frequência de alunos</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={peakHoursConfig}>
                <BarChart
                  accessibilityLayer
                  data={formatBarData(peakHoursData, peakHoursLabels)}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                  <Tooltip<number, string>
                    content={({ active, payload, label }) => 
                      renderTooltip(active, payload as TooltipPayload[], label, peakHoursConfig)
                    }
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

