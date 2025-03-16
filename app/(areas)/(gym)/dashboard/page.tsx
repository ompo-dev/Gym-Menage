'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import {
  AreaChartComponent,
  DonutChartComponent,
  MultipleBarChartComponent,
  StackedBarChartComponent,
} from '@/components/charts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Loader2,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
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

// Tipo para os dados de relatório
interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  category: string;
}

// Dados simulados de relatórios
const reports: Report[] = [
  {
    id: 'rep-1',
    title: 'Relatório Mensal de Frequência',
    description: 'Análise da frequência de clientes durante o mês de Abril',
    date: '30/04/2024',
    status: 'Completo',
    category: 'Frequência',
  },
  {
    id: 'rep-2',
    title: 'Análise de Desempenho de Funcionários',
    description: 'Avaliação trimestral de desempenho dos instrutores',
    date: '15/04/2024',
    status: 'Completo',
    category: 'Funcionários',
  },
  {
    id: 'rep-3',
    title: 'Relatório Financeiro - Q1',
    description: 'Resumo financeiro do primeiro trimestre de 2024',
    date: '10/04/2024',
    status: 'Pendente',
    category: 'Financeiro',
  },
  {
    id: 'rep-4',
    title: 'Manutenção de Equipamentos',
    description: 'Status atual e programação de manutenção dos equipamentos',
    date: '05/04/2024',
    status: 'Em Progresso',
    category: 'Equipamentos',
  },
  {
    id: 'rep-5',
    title: 'Análise de Retenção de Clientes',
    description: 'Estudo sobre taxas de renovação e cancelamento de planos',
    date: '01/04/2024',
    status: 'Completo',
    category: 'Clientes',
  },
];

// Definição das colunas para a tabela de relatórios
const reportColumns: ColumnDef<Report>[] = [
  {
    header: 'Título',
    accessorKey: 'title',
    cell: ({ row }) => <div className="font-medium">{row.getValue('title')}</div>,
  },
  {
    header: 'Categoria',
    accessorKey: 'category',
  },
  {
    header: 'Data',
    accessorKey: 'date',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      let variant: 'default' | 'secondary' | 'outline' = 'default';

      if (status === 'Pendente') {
        variant = 'outline';
      } else if (status === 'Em Progresso') {
        variant = 'secondary';
      }

      return (
        <Badge variant={variant}>
          {status === 'Completo' && (
            <span className="flex items-center">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {status}
            </span>
          )}
          {status === 'Pendente' && (
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {status}
            </span>
          )}
          {status === 'Em Progresso' && (
            <span className="flex items-center">
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              {status}
            </span>
          )}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: () => (
      <Button variant="ghost" size="icon">
        <ArrowUpRight className="h-4 w-4" />
      </Button>
    ),
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
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>
                Lista dos últimos relatórios gerados para sua academia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="completed">Completos</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <DataTable
                    data={reports}
                    columns={reportColumns}
                    searchColumn="title"
                    searchPlaceholder="Buscar relatórios..."
                  />
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                  <DataTable
                    data={reports.filter((report) => report.status === 'Completo')}
                    columns={reportColumns}
                    searchColumn="title"
                    searchPlaceholder="Buscar relatórios completos..."
                  />
                </TabsContent>
                <TabsContent value="pending" className="space-y-4">
                  <DataTable
                    data={reports.filter(
                      (report) => report.status === 'Pendente' || report.status === 'Em Progresso'
                    )}
                    columns={reportColumns}
                    searchColumn="title"
                    searchPlaceholder="Buscar relatórios pendentes..."
                  />
                </TabsContent>
              </Tabs>
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
