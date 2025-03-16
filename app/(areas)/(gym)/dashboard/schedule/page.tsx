'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, Plus, Users, X } from 'lucide-react';
import { Suspense, useState } from 'react';

// Dados simulados de aulas
const initialClasses = [
  {
    id: 1,
    name: 'Musculação Avançada',
    instructor: 'Carlos Silva',
    day: 'Segunda',
    startTime: '14:00',
    endTime: '15:00',
    capacity: 15,
    enrolled: 12,
    room: 'Sala de Musculação',
  },
  {
    id: 2,
    name: 'Pilates',
    instructor: 'Ana Oliveira',
    day: 'Segunda',
    startTime: '15:30',
    endTime: '16:30',
    capacity: 10,
    enrolled: 8,
    room: 'Sala de Pilates',
  },
  {
    id: 3,
    name: 'Spinning',
    instructor: 'Marcos Santos',
    day: 'Segunda',
    startTime: '17:00',
    endTime: '18:00',
    capacity: 20,
    enrolled: 15,
    room: 'Sala de Spinning',
  },
  {
    id: 4,
    name: 'Yoga',
    instructor: 'Juliana Costa',
    day: 'Segunda',
    startTime: '18:30',
    endTime: '19:30',
    capacity: 12,
    enrolled: 10,
    room: 'Sala de Yoga',
  },
  {
    id: 5,
    name: 'Funcional',
    instructor: 'Roberto Almeida',
    day: 'Terça',
    startTime: '07:00',
    endTime: '08:00',
    capacity: 15,
    enrolled: 9,
    room: 'Sala Multiuso',
  },
  {
    id: 6,
    name: 'Pilates',
    instructor: 'Ana Oliveira',
    day: 'Terça',
    startTime: '09:00',
    endTime: '10:00',
    capacity: 10,
    enrolled: 7,
    room: 'Sala de Pilates',
  },
  {
    id: 7,
    name: 'Musculação Iniciante',
    instructor: 'Carlos Silva',
    day: 'Terça',
    startTime: '16:00',
    endTime: '17:00',
    capacity: 12,
    enrolled: 8,
    room: 'Sala de Musculação',
  },
  {
    id: 8,
    name: 'Spinning',
    instructor: 'Marcos Santos',
    day: 'Quarta',
    startTime: '17:00',
    endTime: '18:00',
    capacity: 20,
    enrolled: 18,
    room: 'Sala de Spinning',
  },
  {
    id: 9,
    name: 'Yoga',
    instructor: 'Juliana Costa',
    day: 'Quarta',
    startTime: '18:30',
    endTime: '19:30',
    capacity: 12,
    enrolled: 11,
    room: 'Sala de Yoga',
  },
  {
    id: 10,
    name: 'Funcional',
    instructor: 'Roberto Almeida',
    day: 'Quinta',
    startTime: '07:00',
    endTime: '08:00',
    capacity: 15,
    enrolled: 10,
    room: 'Sala Multiuso',
  },
  {
    id: 11,
    name: 'Pilates',
    instructor: 'Ana Oliveira',
    day: 'Quinta',
    startTime: '09:00',
    endTime: '10:00',
    capacity: 10,
    enrolled: 9,
    room: 'Sala de Pilates',
  },
  {
    id: 12,
    name: 'Musculação Avançada',
    instructor: 'Carlos Silva',
    day: 'Sexta',
    startTime: '14:00',
    endTime: '15:00',
    capacity: 15,
    enrolled: 13,
    room: 'Sala de Musculação',
  },
  {
    id: 13,
    name: 'Spinning',
    instructor: 'Marcos Santos',
    day: 'Sexta',
    startTime: '17:00',
    endTime: '18:00',
    capacity: 20,
    enrolled: 16,
    room: 'Sala de Spinning',
  },
  {
    id: 14,
    name: 'Yoga',
    instructor: 'Juliana Costa',
    day: 'Sexta',
    startTime: '18:30',
    endTime: '19:30',
    capacity: 12,
    enrolled: 8,
    room: 'Sala de Yoga',
  },
  {
    id: 15,
    name: 'Funcional',
    instructor: 'Roberto Almeida',
    day: 'Sábado',
    startTime: '09:00',
    endTime: '10:00',
    capacity: 15,
    enrolled: 12,
    room: 'Sala Multiuso',
  },
];

// Dias da semana
const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

// Horários de funcionamento
const operatingHours = [
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
];

interface ClassData {
  id: number;
  name: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolled: number;
  room: string;
}

interface NewClassData {
  name: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: string;
  room: string;
}

function SchedulePageContent() {
  const [classes, setClasses] = useState<ClassData[]>(initialClasses);
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [isNewClassDialogOpen, setIsNewClassDialogOpen] = useState(false);
  const [newClass, setNewClass] = useState<NewClassData>({
    name: '',
    instructor: '',
    day: 'Segunda',
    startTime: '08:00',
    endTime: '09:00',
    capacity: '',
    room: '',
  });

  // Filtrar aulas pelo dia selecionado
  const filteredClasses = classes.filter((cls) => cls.day === selectedDay);

  // Manipular mudanças no formulário de nova aula
  const handleNewClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar nova aula
  const handleAddClass = () => {
    const newClassData: ClassData = {
      id: classes.length + 1,
      ...newClass,
      capacity: Number.parseInt(newClass.capacity) || 0,
      enrolled: 0,
    };

    setClasses([...classes, newClassData]);
    setNewClass({
      name: '',
      instructor: '',
      day: 'Segunda',
      startTime: '08:00',
      endTime: '09:00',
      capacity: '',
      room: '',
    });
    setIsNewClassDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Agendamento de Aulas</h1>
        <Dialog open={isNewClassDialogOpen} onOpenChange={setIsNewClassDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nova Aula
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Aula</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova aula. Clique em salvar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome da Aula
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newClass.name}
                  onChange={handleNewClassChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="instructor" className="text-right">
                  Instrutor
                </Label>
                <Input
                  id="instructor"
                  name="instructor"
                  value={newClass.instructor}
                  onChange={handleNewClassChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="day" className="text-right">
                  Dia
                </Label>
                <Select
                  value={newClass.day}
                  onValueChange={(value) => setNewClass((prev) => ({ ...prev, day: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Horário Início
                </Label>
                <Select
                  value={newClass.startTime}
                  onValueChange={(value) => setNewClass((prev) => ({ ...prev, startTime: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {operatingHours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  Horário Fim
                </Label>
                <Select
                  value={newClass.endTime}
                  onValueChange={(value) => setNewClass((prev) => ({ ...prev, endTime: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent>
                    {operatingHours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacidade
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={newClass.capacity}
                  onChange={handleNewClassChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">
                  Sala
                </Label>
                <Input
                  id="room"
                  name="room"
                  value={newClass.room}
                  onChange={handleNewClassChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewClassDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClass}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda Semanal</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as aulas programadas para a semana.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDay} onValueChange={setSelectedDay} className="space-y-4">
            <TabsList className="grid grid-cols-7">
              {weekDays.map((day) => (
                <TabsTrigger key={day} value={day}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            {weekDays.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="grid gap-4">
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls) => (
                      <Card key={cls.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="rounded-full bg-primary/10 p-3 text-primary">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-medium">{cls.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Instrutor: {cls.instructor}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {cls.startTime} - {cls.endTime}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>
                                    {cls.enrolled}/{cls.capacity} alunos
                                  </span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
                      <div className="text-center">
                        <h3 className="font-medium">Nenhuma aula agendada</h3>
                        <p className="text-sm text-muted-foreground">
                          Não há aulas agendadas para {day}.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setNewClass((prev) => ({ ...prev, day }));
                            setIsNewClassDialogOpen(true);
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Aula
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SchedulePageContent />
    </Suspense>
  );
}
