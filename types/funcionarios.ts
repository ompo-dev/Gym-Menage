import type { DiaSemana, Modalidade, StatusAtivo } from './common';

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cargo: string;
  especialidades: Modalidade[];
  academiaId: number;
  status: StatusAtivo;
  dataContratacao: string;
  horarioTrabalho: {
    [key in DiaSemana]?: string[];
  };
  salario: number;
  comissao: number;
}

export interface Aula {
  id: number;
  nome: string;
  instrutor: number;
  modalidade: Modalidade;
  capacidade: number;
  duracao: number;
  nivel: string;
  horarios: {
    [key in DiaSemana]?: string[];
  };
  academiaId: number;
  status: StatusAtivo;
}

export interface AulaAgendada {
  id: number;
  nome: string;
  instrutor: string;
  horario: string;
  capacidade: number;
  inscritos: number[];
  sala: string;
  status: 'confirmada' | 'cancelada' | 'pendente';
  data: string;
}

export interface Evento {
  id: number;
  titulo: string;
  tipo: string;
  data: string;
  horario: string;
  duracao: number;
  instrutor: number;
  capacidade: number;
  inscritos: number[];
  descricao: string;
  requisitos: string[];
  valor: number;
  status: 'agendado' | 'cancelado' | 'concluido' | 'em_andamento';
}
