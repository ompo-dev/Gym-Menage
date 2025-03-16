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
  AlertTriangle,
  CheckCircle2,
  CircleX,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import { Suspense, useState } from 'react';

// Tipo para os dados de equipamento
interface Equipment {
  id: number;
  name: string;
  type: string;
  brand: string;
  model: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

// Dados simulados de equipamentos
const initialEquipments = [
  {
    id: 1,
    name: 'Esteira Profissional',
    type: 'Cardio',
    brand: 'TechnoGym',
    model: 'Run 700',
    status: 'Operacional',
    lastMaintenance: '10/04/2024',
    nextMaintenance: '10/07/2024',
  },
  {
    id: 2,
    name: 'Leg Press',
    type: 'Musculação',
    brand: 'Life Fitness',
    model: 'Signature',
    status: 'Operacional',
    lastMaintenance: '15/03/2024',
    nextMaintenance: '15/06/2024',
  },
  {
    id: 3,
    name: 'Bicicleta Ergométrica',
    type: 'Cardio',
    brand: 'Movement',
    model: 'BM 2700',
    status: 'Em Manutenção',
    lastMaintenance: '05/05/2024',
    nextMaintenance: '05/06/2024',
  },
  {
    id: 4,
    name: 'Banco Supino',
    type: 'Musculação',
    brand: 'Hammer Strength',
    model: 'Olympic',
    status: 'Operacional',
    lastMaintenance: '20/02/2024',
    nextMaintenance: '20/05/2024',
  },
  {
    id: 5,
    name: 'Elíptico',
    type: 'Cardio',
    brand: 'Matrix',
    model: 'E50',
    status: 'Inoperante',
    lastMaintenance: '10/01/2024',
    nextMaintenance: '10/04/2024',
  },
];

// Componente de ações para cada linha
function EquipmentRowActions({ row }: { row: Row<Equipment> }) {
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
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function EquipmentPageContent() {
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments);
  const [isNewEquipmentDialogOpen, setIsNewEquipmentDialogOpen] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    brand: '',
    model: '',
    status: 'Operacional',
  });

  // Definição das colunas para a tabela
  const columns: ColumnDef<Equipment>[] = [
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
      header: 'Tipo',
      accessorKey: 'type',
      size: 120,
    },
    {
      header: 'Marca',
      accessorKey: 'brand',
      size: 120,
    },
    {
      header: 'Modelo',
      accessorKey: 'model',
      size: 120,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        let variant: 'default' | 'destructive' | 'outline' = 'default';

        if (status === 'Em Manutenção') {
          variant = 'outline';
        } else if (status === 'Inoperante') {
          variant = 'destructive';
        }

        return (
          <Badge variant={variant}>
            {status === 'Operacional' && (
              <span className="flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                {status}
              </span>
            )}
            {status === 'Em Manutenção' && (
              <span className="flex items-center">
                <AlertTriangle className="mr-1 h-3 w-3" />
                {status}
              </span>
            )}
            {status === 'Inoperante' && (
              <span className="flex items-center">
                <CircleX className="mr-1 h-3 w-3" />
                {status}
              </span>
            )}
          </Badge>
        );
      },
      size: 120,
      filterFn: statusFilterFn,
    },
    {
      header: 'Última Manutenção',
      accessorKey: 'lastMaintenance',
      size: 140,
    },
    {
      header: 'Próxima Manutenção',
      accessorKey: 'nextMaintenance',
      size: 140,
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => <EquipmentRowActions row={row} />,
      size: 60,
      enableHiding: false,
    },
  ];

  // Manipular mudanças no formulário de novo equipamento
  const handleNewEquipmentChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setNewEquipment((prev) => ({ ...prev, [name]: value }));
  };

  // Adicionar novo equipamento
  const handleAddEquipment = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    // Calcular próxima manutenção (3 meses depois)
    const nextMaintenance = new Date(today);
    nextMaintenance.setMonth(nextMaintenance.getMonth() + 3);
    const formattedNextMaintenance = `${nextMaintenance.getDate().toString().padStart(2, '0')}/${(nextMaintenance.getMonth() + 1).toString().padStart(2, '0')}/${nextMaintenance.getFullYear()}`;

    const newEquipmentData = {
      id: equipments.length + 1,
      ...newEquipment,
      lastMaintenance: formattedDate,
      nextMaintenance: formattedNextMaintenance,
    };

    setEquipments([...equipments, newEquipmentData]);
    setNewEquipment({
      name: '',
      type: '',
      brand: '',
      model: '',
      status: 'Operacional',
    });
    setIsNewEquipmentDialogOpen(false);
  };

  // Excluir equipamentos selecionados
  const handleDeleteEquipments = (selectedEquipments: Equipment[]) => {
    const updatedEquipments = equipments.filter(
      (equipment) => !selectedEquipments.some((selected) => selected.id === equipment.id)
    );
    setEquipments(updatedEquipments);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Equipamentos</h1>
        <Dialog open={isNewEquipmentDialogOpen} onOpenChange={setIsNewEquipmentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Novo Equipamento
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
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <Select
                  value={newEquipment.type}
                  onValueChange={(value) => setNewEquipment((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Musculação">Musculação</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Marca
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  value={newEquipment.brand}
                  onChange={handleNewEquipmentChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Modelo
                </Label>
                <Input
                  id="model"
                  name="model"
                  value={newEquipment.model}
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
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="operational">Operacionais</TabsTrigger>
              <TabsTrigger value="maintenance">Em Manutenção</TabsTrigger>
              <TabsTrigger value="inoperative">Inoperantes</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <DataTable
                data={equipments}
                columns={columns}
                searchColumn="name"
                statusColumn="status"
                onDeleteRows={handleDeleteEquipments}
                onAddItem={() => setIsNewEquipmentDialogOpen(true)}
                addButtonText="Novo Equipamento"
                searchPlaceholder="Buscar por nome, marca ou modelo..."
              />
            </TabsContent>
            <TabsContent value="operational" className="space-y-4">
              <DataTable
                data={equipments.filter((equipment) => equipment.status === 'Operacional')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteEquipments}
                onAddItem={() => setIsNewEquipmentDialogOpen(true)}
                addButtonText="Novo Equipamento"
                searchPlaceholder="Buscar por nome, marca ou modelo..."
              />
            </TabsContent>
            <TabsContent value="maintenance" className="space-y-4">
              <DataTable
                data={equipments.filter((equipment) => equipment.status === 'Em Manutenção')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteEquipments}
                onAddItem={() => setIsNewEquipmentDialogOpen(true)}
                addButtonText="Novo Equipamento"
                searchPlaceholder="Buscar por nome, marca ou modelo..."
              />
            </TabsContent>
            <TabsContent value="inoperative" className="space-y-4">
              <DataTable
                data={equipments.filter((equipment) => equipment.status === 'Inoperante')}
                columns={columns}
                searchColumn="name"
                onDeleteRows={handleDeleteEquipments}
                onAddItem={() => setIsNewEquipmentDialogOpen(true)}
                addButtonText="Novo Equipamento"
                searchPlaceholder="Buscar por nome, marca ou modelo..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default function EquipmentPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EquipmentPageContent />
    </Suspense>
  );
}
