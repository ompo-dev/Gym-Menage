"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Download, Users, DollarSign, Calendar } from "lucide-react"
import {
  AreaChartComponent,
  DonutChartComponent,
  MultipleBarChartComponent,
  StackedBarChartComponent
} from "@/components/charts"

// Define types for the data structures
type TimeRange = 'week' | 'month' | 'year'

interface ChartData {
  date: string
  attendance: number
}

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

  const timeRangeLabels: TimeRangeLabels = {
    week: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
    year: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  }

  // Formatar dados para os gráficos
  const formatChartData = (data: number[], labels: string[]): ChartData[] => {
    return data.map((value, index) => ({
      date: labels[index],
      attendance: value
    }))
  }

  const revenueChartData = formatChartData(revenueData[timeRange], timeRangeLabels[timeRange])
  const clientsChartData = formatChartData(clientsData[timeRange], timeRangeLabels[timeRange])
  const attendanceChartData = formatChartData(attendanceData[timeRange], timeRangeLabels[timeRange])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
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
              <AreaChartComponent
                data={revenueChartData}
                title="Receita"
                description="Análise da receita ao longo do tempo"
              />
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
                    +{Math.round(
                      ((revenueData[timeRange][revenueData[timeRange].length - 1] -
                        revenueData[timeRange][revenueData[timeRange].length - 2]) /
                        revenueData[timeRange][revenueData[timeRange].length - 2]) *
                        100
                    )}%
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
                <DonutChartComponent
                  data={[
                    { name: "Mensal", value: 95 },
                    { name: "Trimestral", value: 45 },
                    { name: "Semestral", value: 20 },
                    { name: "Anual", value: 50 }
                  ]}
                  title="Distribuição por Plano"
                  description="Distribuição de receita por plano"
                />
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
              <AreaChartComponent
                data={clientsChartData}
                title="Crescimento de Clientes"
                description="Evolução do número de clientes"
              />
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
                    +{Math.round(
                      ((clientsData[timeRange][clientsData[timeRange].length - 1] -
                        clientsData[timeRange][clientsData[timeRange].length - 2]) /
                        clientsData[timeRange][clientsData[timeRange].length - 2]) *
                        100
                    )}%
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
                <DonutChartComponent
                  data={[
                    { name: "Mensal", value: 95 },
                    { name: "Trimestral", value: 45 },
                    { name: "Semestral", value: 20 },
                    { name: "Anual", value: 50 }
                  ]}
                  title="Distribuição por Plano"
                  description="Número de clientes por plano"
                />
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
                <MultipleBarChartComponent
                  data={[
                    { name: "Spinning", completed: 25, missed: 5 },
                    { name: "Musculação", completed: 18, missed: 2 },
                    { name: "Yoga", completed: 15, missed: 3 },
                    { name: "Pilates", completed: 12, missed: 2 },
                    { name: "Funcional", completed: 10, missed: 2 }
                  ]}
                  title="Popularidade das Aulas"
                  description="Aulas mais populares por número de alunos"
                />
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
              <AreaChartComponent
                data={attendanceChartData}
                title="Frequência"
                description="Número de alunos presentes nas aulas"
              />
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
                    +{Math.round(
                      ((attendanceData[timeRange][attendanceData[timeRange].length - 1] -
                        attendanceData[timeRange][attendanceData[timeRange].length - 2]) /
                        attendanceData[timeRange][attendanceData[timeRange].length - 2]) *
                        100
                    )}%
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
              <MultipleBarChartComponent
                data={[
                  { name: "6h", completed: 5, missed: 0 },
                  { name: "8h", completed: 12, missed: 3 },
                  { name: "10h", completed: 25, missed: 5 },
                  { name: "12h", completed: 35, missed: 8 },
                  { name: "14h", completed: 38, missed: 7 },
                  { name: "16h", completed: 30, missed: 5 },
                  { name: "18h", completed: 40, missed: 10 },
                  { name: "20h", completed: 20, missed: 5 }
                ]}
                title="Horários de Pico"
                description="Horários com maior frequência de alunos"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

