'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Apple,
  BarChart,
  CalendarDays,
  ChevronRight,
  Clock,
  Plus,
  Scale,
  Utensils,
} from 'lucide-react';
import { useState } from 'react';

import { AreaChartComponent } from '@/components/charts/area-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Dados simulados
const dietData = {
  today: {
    calories: {
      target: 2500,
      current: 1850,
      remaining: 650,
    },
    macros: {
      protein: { target: 180, current: 135 },
      carbs: { target: 280, current: 210 },
      fat: { target: 70, current: 52 },
    },
    meals: [
      {
        name: 'Café da Manhã',
        time: '07:30',
        foods: [
          { name: 'Aveia', portion: '50g', calories: 180 },
          { name: 'Banana', portion: '1 unid', calories: 105 },
          { name: 'Whey Protein', portion: '30g', calories: 120 },
        ],
        completed: true,
      },
      {
        name: 'Lanche da Manhã',
        time: '10:00',
        foods: [
          { name: 'Iogurte Natural', portion: '170g', calories: 150 },
          { name: 'Granola', portion: '20g', calories: 95 },
        ],
        completed: true,
      },
      {
        name: 'Almoço',
        time: '13:00',
        foods: [
          { name: 'Arroz Integral', portion: '100g', calories: 110 },
          { name: 'Frango Grelhado', portion: '150g', calories: 165 },
          { name: 'Legumes', portion: '200g', calories: 70 },
        ],
        completed: true,
      },
      {
        name: 'Lanche da Tarde',
        time: '16:00',
        foods: [
          { name: 'Pão Integral', portion: '2 fatias', calories: 140 },
          { name: 'Ovo', portion: '2 unid', calories: 155 },
        ],
        completed: false,
      },
      {
        name: 'Jantar',
        time: '20:00',
        foods: [
          { name: 'Batata Doce', portion: '150g', calories: 135 },
          { name: 'Atum', portion: '120g', calories: 140 },
          { name: 'Salada', portion: '200g', calories: 45 },
        ],
        completed: false,
      },
    ],
  },
  progress: [
    { date: '2024-02-14', attendance: 2200 },
    { date: '2024-02-21', attendance: 2350 },
    { date: '2024-02-28', attendance: 2450 },
    { date: '2024-03-07', attendance: 2400 },
    { date: '2024-03-14', attendance: 2500 },
  ],
};

const quickActions = [
  {
    title: 'Registrar Refeição',
    description: 'Adicionar alimentos',
    icon: Plus,
    color: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Ver Cardápio',
    description: 'Plano completo',
    icon: Utensils,
    color: 'bg-muted hover:bg-muted/80',
  },
  {
    title: 'Análise Nutricional',
    description: 'Relatório detalhado',
    icon: BarChart,
    color: 'bg-muted hover:bg-muted/80',
  },
];

export default function DietPage() {
  const [activeTab, setActiveTab] = useState('today');
  const caloriesProgress = (dietData.today.calories.current / dietData.today.calories.target) * 100;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Plano Alimentar</h1>
        <p className="text-muted-foreground">Acompanhe sua dieta e nutrição</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn('group relative overflow-hidden', action.color)}>
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
            <CardTitle>Calorias</CardTitle>
            <CardDescription>Meta Diária: {dietData.today.calories.target} kcal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Progress value={caloriesProgress} className="h-2" />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{dietData.today.calories.current}</div>
                  <div className="text-xs text-muted-foreground">Consumidas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{dietData.today.calories.remaining}</div>
                  <div className="text-xs text-muted-foreground">Restantes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{Math.round(caloriesProgress)}%</div>
                  <div className="text-xs text-muted-foreground">Progresso</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Proteínas</CardTitle>
            <CardDescription>Meta: {dietData.today.macros.protein.target}g</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Progress
                value={
                  (dietData.today.macros.protein.current / dietData.today.macros.protein.target) *
                  100
                }
                className="h-2"
              />
              <div className="text-2xl font-bold">{dietData.today.macros.protein.current}g</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Carboidratos</CardTitle>
            <CardDescription>Meta: {dietData.today.macros.carbs.target}g</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Progress
                value={
                  (dietData.today.macros.carbs.current / dietData.today.macros.carbs.target) * 100
                }
                className="h-2"
              />
              <div className="text-2xl font-bold">{dietData.today.macros.carbs.current}g</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="meals">Refeições</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refeições de Hoje</CardTitle>
              <CardDescription>Seu plano alimentar para o dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dietData.today.meals.map((meal) => (
                  <div
                    key={meal.name}
                    className={cn(
                      'flex flex-col gap-4 rounded-lg border p-4',
                      meal.completed && 'bg-muted/50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Utensils className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{meal.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {meal.time}
                          </div>
                        </div>
                      </div>
                      {meal.completed && (
                        <div className="text-sm text-muted-foreground">Concluído</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {meal.foods.map((food) => (
                        <div key={food.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Apple className="h-4 w-4 text-muted-foreground" />
                            <span>{food.name}</span>
                            <span className="text-muted-foreground">({food.portion})</span>
                          </div>
                          <div>{food.calories} kcal</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consumo Calórico</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AreaChartComponent data={dietData.progress} title="Consumo Calórico" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
