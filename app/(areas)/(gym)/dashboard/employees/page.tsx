"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, MoreVertical, Search, Filter, Trash2, Edit, Eye, Calendar } from "lucide-react"

// Dados simulados de funcionários
const initialEmployees = [
  {
    id: 1,
    name: "Roberto Almeida",
    role: "Personal Trainer",
    email: "roberto.almeida@email.com",
    phone: "(11) 98765-4321",
    status: "Ativo",
    hireDate: "10/01/2024",
    schedule: "Segunda a Sexta, 6h às 15h",
  },
  {
    id: 2,
    name: "Juliana Costa",
    role: "Instrutora de Yoga",
    email: "juliana.costa@email.com",
    phone: "(11) 91234-5678",
    status: "Ativo",
    hireDate: "15/03/2024",
    schedule: "Terça e Quinta, 18h às 21h",
  },
  {
    id: 3,
    name: "Marcos Santos",
    role: "Instrutor de Spinning",
    email: "marcos.santos@email.com",
    phone: "(11) 99876-5432",
    status: "Ativo",
    hireDate: "05/11/2023",
    schedule: "Segunda, Quarta e Sexta, 17h às 20h",
  },
  {
    id: 4,
    name: "Ana Oliveira",
    role: "Instrutora de Pilates",
    email: "ana.oliveira@email.com",
    phone: "(11) 95555-4444",
    status: "Ativo",
    hireDate: "20/06/2023",
    schedule: "Segunda a Sexta, 8h às 12h",
  },
  {
    id: 5,
    name: "Carlos Silva",
    role: "Personal Trainer",
    email: "carlos.silva@email.com",
    phone: "(11) 94444-3333",
    status: "Inativo",
    hireDate: "10/02/2023",
    schedule: "Segunda a Sábado, 14h às 22h",
  },
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "Ativo",
    schedule: "",
  })

  // Filtrar funcionários
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesRole = roleFilter === "all" || employee.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  // Manipular mudanças no formulário de novo funcionário
  const handleNewEmployeeChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setNewEmployee((prev) => ({ ...prev, [name]: value }))
  }

  // Adicionar novo funcionário
  const handleAddEmployee = () => {
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const newEmployeeData = {
      id: employees.length + 1,
      ...newEmployee,
      hireDate: formattedDate,
    }

    setEmployees([...employees, newEmployeeData])
    setNewEmployee({
      name: "",
      role: "",
      email: "",
      phone: "",
      status: "Ativo",
      schedule: "",
    })
    setIsNewEmployeeDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <Dialog open={isNewEmployeeDialogOpen} onOpenChange={setIsNewEmployeeDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Novo Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo funcionário. Clique em salvar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleNewEmployeeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Cargo
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={newEmployee.role}
                  onChange={handleNewEmployeeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={handleNewEmployeeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newEmployee.phone}
                  onChange={handleNewEmployeeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">
                  Horário
                </Label>
                <Input
                  id="schedule"
                  name="schedule"
                  value={newEmployee.schedule}
                  onChange={handleNewEmployeeChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newEmployee.status}
                  onValueChange={(value) => setNewEmployee((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewEmployeeDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddEmployee}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Funcionários</CardTitle>
          <CardDescription>
            Visualize, adicione, edite e gerencie todos os funcionários da sua academia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="inactive">Inativos</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar funcionário..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filtrar</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <div className="space-y-1">
                        <Label>Status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Ativo">Ativo</SelectItem>
                            <SelectItem value="Inativo">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Label>Cargo</Label>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Personal Trainer">Personal Trainer</SelectItem>
                            <SelectItem value="Instrutora de Yoga">Instrutor de Yoga</SelectItem>
                            <SelectItem value="Instrutor de Spinning">Instrutor de Spinning</SelectItem>
                            <SelectItem value="Instrutora de Pilates">Instrutor de Pilates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Contratação</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.phone}</TableCell>
                          <TableCell>
                            <Badge variant={employee.status === "Ativo" ? "default" : "destructive"}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{employee.hireDate}</TableCell>
                          <TableCell>{employee.schedule}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Abrir menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Visualizar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Editar</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  <span>Gerenciar Horário</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Excluir</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          Nenhum funcionário encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              {/* Conteúdo similar para funcionários ativos */}
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              {/* Conteúdo similar para funcionários inativos */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

