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
import { Textarea } from "@/components/ui/textarea"
import { Dumbbell, MoreVertical, Search, Filter, Trash2, Edit, Eye, AlertTriangle, CheckCircle2 } from "lucide-react"

// Dados simulados de equipamentos
const initialEquipment = [
  {
    id: 1,
    name: "Esteira Profissional X3000",
    category: "Cardio",
    status: "Operacional",
    purchaseDate: "10/01/2023",
    lastMaintenance: "15/02/2025",
    nextMaintenance: "15/05/2025",
    serialNumber: "EST-X3000-12345",
    notes: "Localizada na área de cardio, próxima à janela",
  },
  {
    id: 2,
    name: "Leg Press 45°",
    category: "Musculação",
    status: "Operacional",
    purchaseDate: "05/06/2022",
    lastMaintenance: "20/01/2025",
    nextMaintenance: "20/04/2025",
    serialNumber: "LP45-98765",
    notes: "Área de musculação, setor 2",
  },
  {
    id: 3,
    name: "Bicicleta Ergométrica B200",
    category: "Cardio",
    status: "Em Manutenção",
    purchaseDate: "15/03/2023",
    lastMaintenance: "10/03/2025",
    nextMaintenance: "10/04/2025",
    serialNumber: "BIKE-B200-54321",
    notes: "Enviada para manutenção externa - problema no painel",
  },
  {
    id: 4,
    name: "Banco Supino Ajustável",
    category: "Musculação",
    status: "Operacional",
    purchaseDate: "20/11/2022",
    lastMaintenance: "05/02/2025",
    nextMaintenance: "05/05/2025",
    serialNumber: "BSA-11223",
    notes: "Área de musculação, setor 1",
  },
  {
    id: 5,
    name: "Elíptico E500",
    category: "Cardio",
    status: "Inoperante",
    purchaseDate: "10/08/2021",
    lastMaintenance: "01/12/2024",
    nextMaintenance: "01/03/2025",
    serialNumber: "ELIP-E500-67890",
    notes: "Aguardando peça de reposição",
  },
]

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState(initialEquipment)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isNewEquipmentDialogOpen, setIsNewEquipmentDialogOpen] = useState(false)
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    category: "",
    status: "Operacional",
    serialNumber: "",
    notes: "",
  })

  // Filtrar equipamentos
  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Manipular mudanças no formulário de novo equipamento
  const handleNewEquipmentChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setNewEquipment((prev) => ({ ...prev, [name]: value }))
  }

  // Adicionar novo equipamento
  const handleAddEquipment = () => {
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    // Calcular próxima manutenção (3 meses a partir de hoje)
    const nextMaintenance = new Date(today)
    nextMaintenance.setMonth(nextMaintenance.getMonth() + 3)
    const formattedNextMaintenance = `${nextMaintenance.getDate().toString().padStart(2, "0")}/${(nextMaintenance.getMonth() + 1).toString().padStart(2, "0")}/${nextMaintenance.getFullYear()}`

    const newEquipmentData = {
      id: equipment.length + 1,
      ...newEquipment,
      purchaseDate: formattedDate,
      lastMaintenance: formattedDate,
      nextMaintenance: formattedNextMaintenance,
    }

    setEquipment([...equipment, newEquipmentData])
    setNewEquipment({
      name: "",
      category: "",
      status: "Operacional",
      serialNumber: "",
      notes: "",
    })
    setIsNewEquipmentDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Equipamentos</h1>
        <Dialog open={isNewEquipmentDialogOpen} onOpenChange={setIsNewEquipmentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Dumbbell className="mr-2 h-4 w-4" /> Novo Equipamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Equipamento</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo equipamento. Clique em salvar quando terminar.
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
                  value={newEquipment.name}
                  onChange={handleNewEquipmentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Categoria
                </Label>
                <Select
                  value={newEquipment.category}
                  onValueChange={(value) => setNewEquipment((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Musculação">Musculação</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                    <SelectItem value="Acessórios">Acessórios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serialNumber" className="text-right">
                  Número de Série
                </Label>
                <Input
                  id="serialNumber"
                  name="serialNumber"
                  value={newEquipment.serialNumber}
                  onChange={handleNewEquipmentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newEquipment.status}
                  onValueChange={(value) => setNewEquipment((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operacional">Operacional</SelectItem>
                    <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                    <SelectItem value="Inoperante">Inoperante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="notes" className="text-right pt-2">
                  Observações
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newEquipment.notes}
                  onChange={handleNewEquipmentChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewEquipmentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddEquipment}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Equipamentos</CardTitle>
          <CardDescription>
            Visualize, adicione, edite e gerencie todos os equipamentos da sua academia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="operational">Operacionais</TabsTrigger>
                <TabsTrigger value="maintenance">Em Manutenção</TabsTrigger>
                <TabsTrigger value="inoperative">Inoperantes</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar equipamento..."
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
                            <SelectItem value="Operacional">Operacional</SelectItem>
                            <SelectItem value="Em Manutenção">Em Manutenção</SelectItem>
                            <SelectItem value="Inoperante">Inoperante</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Label>Categoria</Label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="Cardio">Cardio</SelectItem>
                            <SelectItem value="Musculação">Musculação</SelectItem>
                            <SelectItem value="Funcional">Funcional</SelectItem>
                            <SelectItem value="Acessórios">Acessórios</SelectItem>
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
                      <TableHead>Categoria</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Compra</TableHead>
                      <TableHead>Última Manutenção</TableHead>
                      <TableHead>Próxima Manutenção</TableHead>
                      <TableHead>Número de Série</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipment.length > 0 ? (
                      filteredEquipment.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === "Operacional"
                                  ? "default"
                                  : item.status === "Em Manutenção"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {item.status === "Operacional" && (
                                <span className="flex items-center">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  {item.status}
                                </span>
                              )}
                              {item.status === "Em Manutenção" && (
                                <span className="flex items-center">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  {item.status}
                                </span>
                              )}
                              {item.status === "Inoperante" && (
                                <span className="flex items-center">
                                  <Trash2 className="mr-1 h-3 w-3" />
                                  {item.status}
                                </span>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.purchaseDate}</TableCell>
                          <TableCell>{item.lastMaintenance}</TableCell>
                          <TableCell>{item.nextMaintenance}</TableCell>
                          <TableCell>{item.serialNumber}</TableCell>
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
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  <span>Registrar Manutenção</span>
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
                          Nenhum equipamento encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="operational" className="space-y-4">
              {/* Conteúdo similar para equipamentos operacionais */}
            </TabsContent>
            <TabsContent value="maintenance" className="space-y-4">
              {/* Conteúdo similar para equipamentos em manutenção */}
            </TabsContent>
            <TabsContent value="inoperative" className="space-y-4">
              {/* Conteúdo similar para equipamentos inoperantes */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

