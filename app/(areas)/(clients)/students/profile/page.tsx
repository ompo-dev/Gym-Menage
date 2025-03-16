"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Target, Trophy } from "lucide-react"

// Dados de exemplo
const studentData = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(11) 98765-4321",
  birthdate: "1990-05-15",
  goals: [
    {
      id: 1,
      title: "Perder Peso",
      description: "Reduzir 10kg em 6 meses",
      progress: 40,
      target: "73kg",
      current: "78kg",
    },
    {
      id: 2,
      title: "Ganho de Massa",
      description: "Aumentar massa magra",
      progress: 60,
      target: "35% massa magra",
      current: "30% massa magra",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "30 Dias Seguidos",
      description: "Treinou por 30 dias consecutivos",
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "Meta de Peso",
      description: "Atingiu 50% da meta de peso",
      date: "2024-03-01",
    },
  ],
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações e objetivos</p>
      </div>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="goals">Objetivos</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-primary/10">
                    <Camera className="h-8 w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                    Alterar
                  </Button>
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold">{studentData.name}</h3>
                  <p className="text-sm text-muted-foreground">Membro desde 2023</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue={studentData.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={studentData.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" defaultValue={studentData.phone} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" defaultValue={studentData.birthdate} />
                </div>
                <Button>Salvar Alterações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meus Objetivos</CardTitle>
              <CardDescription>
                Acompanhe seu progresso em direção aos objetivos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="flex items-start gap-4 py-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Target className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span>Atual: {goal.current}</span>
                          <span>Meta: {goal.target}</span>
                          <span>Progresso: {goal.progress}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full">Adicionar Novo Objetivo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Conquistas</CardTitle>
              <CardDescription>
                Suas conquistas e marcos alcançados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardContent className="flex items-start gap-4 py-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Conquistado em: {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
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