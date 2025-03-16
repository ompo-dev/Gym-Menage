'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import {
  AreaChartComponent,
  DonutChartComponent,
  MultipleBarChartComponent,
  StackedBarChartComponent,
} from '@/components/charts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Calendar, DollarSign, TrendingUp, UserPlus, Users } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

// Sample data for attendance chart
const attendanceData = [
  { date: '2024-01', attendance: 320 },
  { date: '2024-02', attendance: 150 },
  { date: '2024-03', attendance: 180 },
  { date: '2024-04', attendance: 90 },
  { date: '2024-05', attendance: 170 },
  { date: '2024-06', attendance: 380 },
];

// Sample data for plans distribution
const plansData = [
  { name: 'Mensal', value: 150 },
  { name: 'Trimestral', value: 80 },
  { name: 'Semestral', value: 50 },
  { name: 'Anual', value: 20 },
];

// Sample data for workouts
const workoutsData = [
  { name: 'Segunda', completed: 80, missed: 20 },
  { name: 'Terça', completed: 85, missed: 15 },
  { name: 'Quarta', completed: 90, missed: 10 },
  { name: 'Quinta', completed: 75, missed: 25 },
  { name: 'Sexta', completed: 70, missed: 30 },
];

// Sample data for revenue
const revenueData = [
  {
    month: 'Jan',
    mensalidades: 50000,
    produtos: 15000,
    servicos: 8000,
  },
  {
    month: 'Fev',
    mensalidades: 55000,
    produtos: 17000,
    servicos: 9000,
  },
  {
    month: 'Mar',
    mensalidades: 58000,
    produtos: 18000,
    servicos: 10000,
  },
  {
    month: 'Abr',
    mensalidades: 62000,
    produtos: 20000,
    servicos: 11000,
  },
  {
    month: 'Mai',
    mensalidades: 65000,
    produtos: 22000,
    servicos: 12000,
  },
  {
    month: 'Jun',
    mensalidades: 68000,
    produtos: 24000,
    servicos: 13000,
  },
];

function DashboardPageContent() {
  const [activeClients, setActiveClients] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [classesScheduled, setClassesScheduled] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);

  // Simulação de carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveClients(210);
      setMonthlyRevenue(23000);
      setClassesScheduled(48);
      setGrowthRate(12.5);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dados para os mini gráficos
  const clientsSparklineData = [{ value: 165 }, { value: 158 }, { value: 188 }, { value: 210 }];

  const revenueSparklineData = [
    { value: 17000 },
    { value: 16500 },
    { value: 20500 },
    { value: 23000 },
  ];

  const classesSparklineData = [{ value: 38 }, { value: 44 }, { value: 41 }, { value: 48 }];

  const growthSparklineData = [{ value: 6.8 }, { value: 9.2 }, { value: 8.4 }, { value: 12.5 }];

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
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{activeClients}</div>
                <p className="text-xs text-muted-foreground">+15 desde o último mês</p>
              </div>
              <div className="w-[120px] h-[40px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={clientsSparklineData}
                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                  >
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/.15)"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">R$ {monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+18% desde o último mês</p>
              </div>
              <div className="w-[120px] h-[40px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueSparklineData}
                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                  >
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/.15)"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aulas Agendadas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{classesScheduled}</div>
                <p className="text-xs text-muted-foreground">Para os próximos 7 dias</p>
              </div>
              <div className="w-[120px] h-[40px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={classesSparklineData}
                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                  >
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/.15)"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{growthRate}%</div>
                <p className="text-xs text-muted-foreground">Nos últimos 3 meses</p>
              </div>
              <div className="w-[120px] h-[40px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={growthSparklineData}
                    margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
                  >
                    <Area
                      type="natural"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/.15)"
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full col-span-1 md:col-span-2">
              <StackedBarChartComponent
                data={revenueData}
                title="Receita por Categoria"
                description="Distribuição de receita por tipo de serviço"
              />
            </div>
            <DonutChartComponent
              data={plansData}
              title="Distribuição de Planos"
              description="Quantidade de alunos por tipo de plano"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full col-span-1 md:col-span-2">
              <AreaChartComponent
                data={attendanceData}
                title="Frequência de Alunos"
                description="Evolução da frequência ao longo dos meses"
              />
            </div>
            <MultipleBarChartComponent
              data={workoutsData}
              title="Treinos por Dia"
              description="Treinos realizados e perdidos por dia da semana"
            />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Treinos por Modalidade</CardTitle>
              <CardDescription>
                Distribuição de alunos por tipo de treino e dia da semana
              </CardDescription>
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
                    title: 'Financeiro',
                    description: 'Relatórios financeiros detalhados',
                    icon: <DollarSign className="h-5 w-5" />,
                    id: 'financial-report',
                  },
                  {
                    title: 'Frequência',
                    description: 'Análise de frequência dos alunos',
                    icon: <Users className="h-5 w-5" />,
                    id: 'attendance-report',
                  },
                  {
                    title: 'Desempenho',
                    description: 'Métricas de desempenho da academia',
                    icon: <Activity className="h-5 w-5" />,
                    id: 'performance-report',
                  },
                ].map((report) => (
                  <Card key={report.id} className="flex flex-col items-center p-4 text-center">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">{report.icon}</div>
                    <h3 className="mt-3 font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  );
}
