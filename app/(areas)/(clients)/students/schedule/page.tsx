'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarClock, Clock, Users } from 'lucide-react';

// Dados de exemplo
const upcomingClasses = [
  {
    id: 1,
    name: 'Musculação',
    instructor: 'Carlos Silva',
    time: '10:00',
    date: '2024-03-15',
  },
  {
    id: 2,
    name: 'Funcional',
    instructor: 'Ana Paula',
    time: '16:00',
    date: '2024-03-15',
  },
  {
    id: 3,
    name: 'Personal',
    instructor: 'Ricardo Santos',
    time: '14:30',
    date: '2024-03-16',
  },
];

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-muted-foreground">Gerencie suas aulas e horários</p>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas Aulas</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Calendar mode="single" className="rounded-md border" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Aulas</CardTitle>
              <CardDescription>Suas aulas agendadas para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {upcomingClasses.map((class_) => (
                    <Card key={class_.id}>
                      <CardContent className="flex items-center gap-4 py-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Users className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{class_.name}</h3>
                          <p className="text-sm text-muted-foreground">{class_.instructor}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <CalendarClock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(class_.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{class_.time}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
