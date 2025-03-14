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
import { DollarSign, MoreVertical, Search, Filter, Edit, Eye, Receipt, CreditCard } from "lucide-react"

// Dados simulados de pagamentos
const initialPayments = [
  {
    id: 1,
    clientName: "João Silva",
    amount: 120.0,
    date: "10/03/2025",
    dueDate: "15/03/2025",
    status: "Pago",
    method: "Cartão de Crédito",
    plan: "Mensal",
    invoice: "INV-2025-001",
  },
  {
    id: 2,
    clientName: "Maria Oliveira",
    amount: 1200.0,
    date: "05/03/2025",
    dueDate: "10/03/2025",
    status: "Pago",
    method: "Transferência Bancária",
    plan: "Anual",
    invoice: "INV-2025-002",
  },
  {
    id: 3,
    clientName: "Pedro Santos",
    amount: 300.0,
    date: "",
    dueDate: "20/03/2025",
    status: "Pendente",
    method: "",
    plan: "Trimestral",
    invoice: "INV-2025-003",
  },
  {
    id: 4,
    clientName: "Ana Costa",
    amount: 120.0,
    date: "",
    dueDate: "05/03/2025",
    status: "Atrasado",
    method: "",
    plan: "Mensal",
    invoice: "INV-2025-004",
  },
  {
    id: 5,
    clientName: "Carlos Ferreira",
    amount: 1200.0,
    date: "03/03/2025",
    dueDate: "05/03/2025",
    status: "Pago",
    method: "Dinheiro",
    plan: "Anual",
    invoice: "INV-2025-005",
  },
  {
    id: 6,
    clientName: "Fernanda Lima",
    amount: 120.0,
    date: "10/03/2025",
    dueDate: "10/03/2025",
    status: "Pago",
    method: "Cartão de Débito",
    plan: "Mensal",
    invoice: "INV-2025-006",
  },
]

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    clientName: "",
    amount: "",
    dueDate: "",
    status: "Pendente",
    plan: "Mensal",
  })

  // Filtrar pagamentos
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoice.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesPlan = planFilter === "all" || payment.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  // Manipular mudanças no formulário de novo pagamento
  const handleNewPaymentChange = (e) => {
    const { name, value } = e.target
    setNewPayment((prev) => ({ ...prev, [name]: value }))
  }

  // Adicionar novo pagamento
  const handleAddPayment = () => {
    const today = new Date()
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`

    const newPaymentData = {
      id: payments.length + 1,
      ...newPayment,
      date: newPayment.status === "Pago" ? formattedDate : "",
      method: newPayment.status === "Pago" ? "Cartão de Crédito" : "",
      invoice: `INV-2025-${(payments.length + 1).toString().padStart(3, "0")}`,
    }

    setPayments([...payments, newPaymentData])
    setNewPayment({
      clientName: "",
      amount: "",
      dueDate: "",
      status: "Pendente",
      plan: "Mensal",
    })
    setIsNewPaymentDialogOpen(false)
  }

  // Calcular totais
  const totalReceived = filteredPayments
    .filter((payment) => payment.status === "Pago")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalPending = filteredPayments
    .filter((payment) => payment.status === "Pendente")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const totalOverdue = filteredPayments
    .filter((payment) => payment.status === "Atrasado")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pagamentos</h1>
        <Dialog open={isNewPaymentDialogOpen} onOpenChange={setIsNewPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <DollarSign className="mr-2 h-4 w-4" /> Novo Pagamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Novo Pagamento</DialogTitle>
              <DialogDescription>Preencha os dados do pagamento. Clique em salvar quando terminar.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="clientName" className="text-right">
                  Cliente
                </Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={newPayment.clientName}
                  onChange={handleNewPaymentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Valor (R$)
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={handleNewPaymentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Data de Vencimento
                </Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  placeholder="DD/MM/AAAA"
                  value={newPayment.dueDate}
                  onChange={handleNewPaymentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plano
                </Label>
                <Select
                  value={newPayment.plan}
                  onValueChange={(value) => setNewPayment((prev) => ({ ...prev, plan: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mensal">Mensal</SelectItem>
                    <SelectItem value="Trimestral">Trimestral</SelectItem>
                    <SelectItem value="Semestral">Semestral</SelectItem>
                    <SelectItem value="Anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  value={newPayment.status}
                  onValueChange={(value) => setNewPayment((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem value="Atrasado">Atrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewPaymentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPayment}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceived.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">R$ {totalPending.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Atrasado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalOverdue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Pagamentos</CardTitle>
          <CardDescription>Visualize, adicione e gerencie todos os pagamentos da sua academia.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="paid">Pagos</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="overdue">Atrasados</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar pagamento..."
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
                            <SelectItem value="Pago">Pago</SelectItem>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                            <SelectItem value="Atrasado">Atrasado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Label>Plano</Label>
                        <Select value={planFilter} onValueChange={setPlanFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="Mensal">Mensal</SelectItem>
                            <SelectItem value="Trimestral">Trimestral</SelectItem>
                            <SelectItem value="Semestral">Semestral</SelectItem>
                            <SelectItem value="Anual">Anual</SelectItem>
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
                      <TableHead>Fatura</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data de Vencimento</TableHead>
                      <TableHead>Data de Pagamento</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.invoice}</TableCell>
                          <TableCell>{payment.clientName}</TableCell>
                          <TableCell>{payment.plan}</TableCell>
                          <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>{payment.date || "-"}</TableCell>
                          <TableCell>{payment.method || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "Pago"
                                  ? "default"
                                  : payment.status === "Pendente"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
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
                                  <Receipt className="mr-2 h-4 w-4" />
                                  <span>Gerar Recibo</span>
                                </DropdownMenuItem>
                                {payment.status !== "Pago" && (
                                  <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Registrar Pagamento</span>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          Nenhum pagamento encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="paid" className="space-y-4">
              {/* Conteúdo similar para pagamentos pagos */}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {/* Conteúdo similar para pagamentos pendentes */}
            </TabsContent>
            <TabsContent value="overdue" className="space-y-4">
              {/* Conteúdo similar para pagamentos atrasados */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

