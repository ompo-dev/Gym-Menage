'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import { Badge } from '@/components/ui/badge';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Eye, Filter, MoreVertical, Search, Trash2, UserCog, UserPlus } from 'lucide-react';
import { Suspense, useState } from 'react';

// Dados simulados de clientes
const initialClients = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    plan: 'Mensal',
    status: 'Ativo',
    joinDate: '10/01/2025',
    lastVisit: '13/03/2025',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '(11) 91234-5678',
    plan: 'Anual',
    status: 'Ativo',
    joinDate: '05/11/2024',
    lastVisit: '12/03/2025',
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@email.com',
    phone: '(11) 99876-5432',
    plan: 'Trimestral',
    status: 'Ativo',
    joinDate: '20/12/2024',
    lastVisit: '10/03/2025',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(11) 95555-4444',
    plan: 'Mensal',
    status: 'Inativo',
    joinDate: '15/09/2024',
    lastVisit: '01/02/2025',
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@email.com',
    phone: '(11) 94444-3333',
    plan: 'Anual',
    status: 'Ativo',
    joinDate: '03/06/2024',
    lastVisit: '11/03/2025',
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 93333-2222',
    plan: 'Mensal',
    status: 'Ativo',
    joinDate: '10/03/2025',
    lastVisit: '12/03/2025',
  },
  {
    id: 7,
    name: 'Ricardo Gomes',
    email: 'ricardo.gomes@email.com',
    phone: '(11) 92222-1111',
    plan: 'Anual',
    status: 'Ativo',
    joinDate: '12/03/2025',
    lastVisit: '13/03/2025',
  },
  {
    id: 8,
    name: 'Mariana Alves',
    email: 'mariana.alves@email.com',
    phone: '(11) 91111-0000',
    plan: 'Mensal',
    status: 'Ativo',
    joinDate: '15/03/2025',
    lastVisit: '15/03/2025',
  },
];

function ClientsPageContent() {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Mensal',
    status: 'Ativo',
  });

  // Filtrar clientes
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesPlan = planFilter === 'all' || client.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Manipular mudanças no formulário de novo cliente
  const handleNewClientChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setNewClient((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar novo cliente
  const handleAddClient = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    const newClientData = {
      id: clients.length + 1,
      ...newClient,
      joinDate: formattedDate,
      lastVisit: formattedDate,
    };

    setClients([...clients, newClientData]);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      plan: 'Mensal',
      status: 'Ativo',
    });
    setIsNewClientDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Dialog open={isNewClientDialogOpen} onOpenChange={setIsNewClientDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente. Clique em salvar quando terminar.
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
                  value={newClient.name}
                  onChange={handleNewClientChange}
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
                  value={newClient.email}
                  onChange={handleNewClientChange}
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
                  value={newClient.phone}
                  onChange={handleNewClientChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plano
                </Label>
                <Select
                  value={newClient.plan}
                  onValueChange={(value) => setNewClient((prev) => ({ ...prev, plan: value }))}
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
                  value={newClient.status}
                  onValueChange={(value) => setNewClient((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewClientDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddClient}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Clientes</CardTitle>
          <CardDescription>
            Visualize, adicione, edite e gerencie todos os clientes da sua academia.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="inactive">Inativos</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar cliente..."
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
                            <SelectItem value="Pendente">Pendente</SelectItem>
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Plano</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data de Cadastro</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.plan}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                client.status === 'Ativo'
                                  ? 'default'
                                  : client.status === 'Inativo'
                                    ? 'destructive'
                                    : 'outline'
                              }
                            >
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{client.joinDate}</TableCell>
                          <TableCell>{client.lastVisit}</TableCell>
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
                                  <UserCog className="mr-2 h-4 w-4" />
                                  <span>Gerenciar Plano</span>
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
                          Nenhum cliente encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              {/* Conteúdo similar para clientes ativos */}
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              {/* Conteúdo similar para clientes inativos */}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {/* Conteúdo similar para clientes pendentes */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ClientsPageContent />
    </Suspense>
  );
}
