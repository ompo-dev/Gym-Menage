'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Apple,
  Calendar,
  ChevronRight,
  Clock,
  Dumbbell,
  LineChart,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react';

import { AreaChartComponent } from '@/components/charts/area-chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Dados simulados
const studentData = {
  nextWorkout: {
    name: 'Treino A - Superior',
    time: '16:00',
    instructor: 'Carlos Silva',
    completed: 65,
  },
  measurements: {
    weight: {
      current: 75.5,
      initial: 78,
      goal: 73,
    },
    bodyFat: {
      current: 18,
      initial: 20,
      goal: 15,
    },
  },
  nextMeal: {
    name: 'Lanche da Tarde',
    time: '16:00',
    calories: 295,
    foods: [
      { name: 'Pão Integral', portion: '2 fatias' },
      { name: 'Ovo', portion: '2 unid' },
    ],
  },
  nextClass: {
    name: 'Yoga',
    time: '18:30',
    instructor: 'Ana Paula',
    room: 'Sala 3',
  },
  progress: [
    { date: '2024-02-14', attendance: 75 },
    { date: '2024-02-21', attendance: 80 },
    { date: '2024-02-28', attendance: 85 },
    { date: '2024-03-07', attendance: 82 },
    { date: '2024-03-14', attendance: 88 },
  ],
};

const quickLinks = [
  {
    title: 'Próximo Treino',
    description: 'Treino A - Superior',
    icon: Dumbbell,
    href: '/students/workouts',
    color: 'bg-primary text-primary-foreground',
  },
  {
    title: 'Medidas',
    description: 'Atualizar medidas',
    icon: LineChart,
    href: '/students/measurements',
    color: 'bg-muted hover:bg-muted/80',
  },
  {
    title: 'Plano Alimentar',
    description: 'Ver refeições',
    icon: Apple,
    href: '/students/diet',
    color: 'bg-muted hover:bg-muted/80',
  },
];

export default function StudentsPage() {
  const weightProgress =
    ((studentData.measurements.weight.initial - studentData.measurements.weight.current) /
      (studentData.measurements.weight.initial - studentData.measurements.weight.goal)) *
    100;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo, João!</h1>
        <p className="text-muted-foreground">Acompanhe seu progresso e próximas atividades</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn('group relative overflow-hidden cursor-pointer', link.color)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full p-2 bg-background/10">
                      <link.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{link.title}</h3>
                      <p className="text-sm opacity-90">{link.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Próximo Treino</CardTitle>
            <CardDescription>{studentData.nextWorkout.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
                <span>{studentData.nextWorkout.name}</span>
              </div>
              <Progress value={studentData.nextWorkout.completed} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {studentData.nextWorkout.completed}% completo
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próxima Refeição</CardTitle>
            <CardDescription>{studentData.nextMeal.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="font-medium">{studentData.nextMeal.name}</div>
              <div className="text-sm text-muted-foreground">
                {studentData.nextMeal.calories} kcal
              </div>
              <div className="space-y-1">
                {studentData.nextMeal.foods.map((food) => (
                  <div key={food.name} className="text-sm flex items-center gap-2">
                    <Apple className="h-3 w-3 text-muted-foreground" />
                    <span>{food.name}</span>
                    <span className="text-muted-foreground">({food.portion})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próxima Aula</CardTitle>
            <CardDescription>{studentData.nextClass.time}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="font-medium">{studentData.nextClass.name}</div>
              <div className="text-sm text-muted-foreground">
                com {studentData.nextClass.instructor}
              </div>
              <div className="text-sm text-muted-foreground">{studentData.nextClass.room}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meta de Peso</CardTitle>
            <CardDescription>Meta: {studentData.measurements.weight.goal}kg</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">{studentData.measurements.weight.current}kg</div>
              <Progress value={weightProgress} className="h-2" />
              <div className="text-sm text-green-600 dark:text-green-400">
                -
                {(
                  studentData.measurements.weight.initial - studentData.measurements.weight.current
                ).toFixed(1)}
                kg desde o início
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequência</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AreaChartComponent data={studentData.progress} title="Frequência nos Treinos" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conquistas</CardTitle>
            <CardDescription>Seus objetivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Treinos Realizados', value: 23, target: 30, icon: Dumbbell },
                { title: 'Dias Consecutivos', value: 5, target: 7, icon: Clock },
                { title: 'Metas Alcançadas', value: 7, target: 10, icon: Target },
              ].map((achievement) => (
                <div key={achievement.title} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <achievement.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{achievement.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {achievement.value}/{achievement.target}
                      </span>
                    </div>
                    <Progress
                      value={(achievement.value / achievement.target) * 100}
                      className="h-2 mt-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
