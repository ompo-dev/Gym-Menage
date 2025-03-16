'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DataTable,
  DefaultRowActions,
  multiColumnFilterFn,
  statusFilterFn,
} from '@/components/ui/data-table';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ColumnDef, Row } from '@tanstack/react-table';
import {
  CheckCircle2,
  CircleX,
  Clock,
  CreditCard,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Search,
  Trash2,
  UserCog,
  UserPlus,
} from 'lucide-react';
import { Suspense, useState } from 'react';

// Tipo para os dados de cliente
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  joinDate: string;
  lastVisit: string;
}

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

// Componente de ações para cada linha
function ClientRowActions({ row }: { row: Row<Client> }) {
  return (
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
  );
}

function ClientsPageContent() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Mensal',
    status: 'Ativo',
  });

  // Definição das colunas para a tabela
  const columns: ColumnDef<Client>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value: boolean | 'indeterminate') =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      size: 28,
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: 'Nome',
      accessorKey: 'name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
      size: 180,
      filterFn: multiColumnFilterFn,
      enableHiding: false,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      size: 220,
    },
    {
      header: 'Telefone',
      accessorKey: 'phone',
      size: 140,
    },
    {
      header: 'Plano',
      accessorKey: 'plan',
      size: 120,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge
          variant={
            row.getValue('status') === 'Ativo'
              ? 'default'
              : row.getValue('status') === 'Inativo'
                ? 'destructive'
                : 'outline'
          }
        >
          {row.getValue('status') === 'Ativo' && (
            <span className="flex items-center">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {row.getValue('status')}
            </span>
          )}
          {row.getValue('status') === 'Inativo' && (
            <span className="flex items-center">
              <CircleX className="mr-1 h-3 w-3" />
              {row.getValue('status')}
            </span>
          )}
          {row.getValue('status') === 'Pendente' && (
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {row.getValue('status')}
            </span>
          )}
        </Badge>
      ),
      size: 100,
      filterFn: statusFilterFn,
    },
    {
      header: 'Data de Cadastro',
      accessorKey: 'joinDate',
      size: 140,
    },
    {
      header: 'Última Visita',
      accessorKey: 'lastVisit',
      size: 140,
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => <ClientRowActions row={row} />,
      size: 60,
      enableHiding: false,
    },
  ];

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

  // Excluir clientes selecionados
  const handleDeleteClients = (selectedClients: Client[]) => {
    const updatedClients = clients.filter(
      (client) => !selectedClients.some((selected) => selected.id === client.id)
    );
    setClients(updatedClients);
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
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <DataTable
                data={clients}
                columns={columns}
                searchColumn="name"
                statusColumn="status"
                onDeleteRows={handleDeleteClients}
                onAddItem={() => setIsNewClientDialogOpen(true)}
                addButtonText="Novo Cliente"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <DataTable
                data={clients.filter((client) => client.status === 'Ativo')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteClients}
                onAddItem={() => setIsNewClientDialogOpen(true)}
                addButtonText="Novo Cliente"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <DataTable
                data={clients.filter((client) => client.status === 'Inativo')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteClients}
                onAddItem={() => setIsNewClientDialogOpen(true)}
                addButtonText="Novo Cliente"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              <DataTable
                data={clients.filter((client) => client.status === 'Pendente')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteClients}
                onAddItem={() => setIsNewClientDialogOpen(true)}
                addButtonText="Novo Cliente"
                searchPlaceholder="Buscar por nome ou email..."
              />
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
