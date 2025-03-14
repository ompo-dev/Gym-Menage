import { Modalidade, PeriodoDisponivel, StatusAtivo } from './common';

export interface PlanoAcademia {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  beneficios: string[];
  duracao: string;
  status: StatusAtivo;
  modalidades: Modalidade[];
  horarios: {
    inicio: string;
    fim: string;
    restricoes: string[];
  };
  taxaAdesao: number;
  taxaManutencao: number;
  periodosDisponiveis: PeriodoDisponivel[];
}

export interface HistoricoPlano {
  planoId: number;
  dataInicio: string;
  dataFim: string;
  valor: number;
  status: string;
} 