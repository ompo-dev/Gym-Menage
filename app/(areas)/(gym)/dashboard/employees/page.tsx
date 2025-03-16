'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable, multiColumnFilterFn, statusFilterFn } from '@/components/ui/data-table';
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
  Calendar,
  CheckCircle2,
  CircleX,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Search,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { Suspense, useState } from 'react';

// Tipo para os dados de funcionário
interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: string;
  hireDate: string;
  schedule: string;
}

// Dados simulados de funcionários
const initialEmployees = [
  {
    id: 1,
    name: 'Roberto Almeida',
    role: 'Personal Trainer',
    email: 'roberto.almeida@email.com',
    phone: '(11) 98765-4321',
    status: 'Ativo',
    hireDate: '10/01/2024',
    schedule: 'Segunda a Sexta, 6h às 15h',
  },
  {
    id: 2,
    name: 'Juliana Costa',
    role: 'Instrutora de Yoga',
    email: 'juliana.costa@email.com',
    phone: '(11) 91234-5678',
    status: 'Ativo',
    hireDate: '15/03/2024',
    schedule: 'Terça e Quinta, 18h às 21h',
  },
  {
    id: 3,
    name: 'Marcos Santos',
    role: 'Instrutor de Spinning',
    email: 'marcos.santos@email.com',
    phone: '(11) 99876-5432',
    status: 'Ativo',
    hireDate: '05/11/2023',
    schedule: 'Segunda, Quarta e Sexta, 17h às 20h',
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    role: 'Instrutora de Pilates',
    email: 'ana.oliveira@email.com',
    phone: '(11) 95555-4444',
    status: 'Ativo',
    hireDate: '20/06/2023',
    schedule: 'Segunda a Sexta, 8h às 12h',
  },
  {
    id: 5,
    name: 'Carlos Silva',
    role: 'Personal Trainer',
    email: 'carlos.silva@email.com',
    phone: '(11) 94444-3333',
    status: 'Inativo',
    hireDate: '10/02/2023',
    schedule: 'Segunda a Sábado, 14h às 22h',
  },
];

// Componente de ações para cada linha
function EmployeeRowActions({ row }: { row: Row<Employee> }) {
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
          <Calendar className="mr-2 h-4 w-4" />
          <span>Gerenciar Horário</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EmployeesPageContent() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    status: 'Ativo',
    schedule: '',
  });

  // Definição das colunas para a tabela
  const columns: ColumnDef<Employee>[] = [
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
      header: 'Cargo',
      accessorKey: 'role',
      size: 160,
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
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('status') === 'Ativo' ? 'default' : 'destructive'}>
          {row.getValue('status') === 'Ativo' ? (
            <span className="flex items-center">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              {row.getValue('status')}
            </span>
          ) : (
            <span className="flex items-center">
              <CircleX className="mr-1 h-3 w-3" />
              {row.getValue('status')}
            </span>
          )}
        </Badge>
      ),
      size: 100,
      filterFn: statusFilterFn,
    },
    {
      header: 'Data de Contratação',
      accessorKey: 'hireDate',
      size: 140,
    },
    {
      header: 'Horário',
      accessorKey: 'schedule',
      size: 220,
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => <EmployeeRowActions row={row} />,
      size: 60,
      enableHiding: false,
    },
  ];

  // Manipular mudanças no formulário de novo funcionário
  const handleNewEmployeeChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar novo funcionário
  const handleAddEmployee = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    const newEmployeeData = {
      id: employees.length + 1,
      ...newEmployee,
      hireDate: formattedDate,
    };

    setEmployees([...employees, newEmployeeData]);
    setNewEmployee({
      name: '',
      role: '',
      email: '',
      phone: '',
      status: 'Ativo',
      schedule: '',
    });
    setIsNewEmployeeDialogOpen(false);
  };

  // Excluir funcionários selecionados
  const handleDeleteEmployees = (selectedEmployees: Employee[]) => {
    const updatedEmployees = employees.filter(
      (employee) => !selectedEmployees.some((selected) => selected.id === employee.id)
    );
    setEmployees(updatedEmployees);
  };

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
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <DataTable
                data={employees}
                columns={columns}
                searchColumn="name"
                statusColumn="status"
                onDeleteRows={handleDeleteEmployees}
                onAddItem={() => setIsNewEmployeeDialogOpen(true)}
                addButtonText="Novo Funcionário"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
            <TabsContent value="active" className="space-y-4">
              <DataTable
                data={employees.filter((employee) => employee.status === 'Ativo')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteEmployees}
                onAddItem={() => setIsNewEmployeeDialogOpen(true)}
                addButtonText="Novo Funcionário"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
            <TabsContent value="inactive" className="space-y-4">
              <DataTable
                data={employees.filter((employee) => employee.status === 'Inativo')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteEmployees}
                onAddItem={() => setIsNewEmployeeDialogOpen(true)}
                addButtonText="Novo Funcionário"
                searchPlaceholder="Buscar por nome ou email..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EmployeesPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EmployeesPageContent />
    </Suspense>
  );
}
