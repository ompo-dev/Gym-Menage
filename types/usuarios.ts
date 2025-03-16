import type { Endereco, StatusAtivo } from './common';
import type { HistoricoPlano } from './planos';

export type Permissao = 'admin' | 'financeiro' | 'relatorios' | 'instrutor' | 'recepcionista';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
  academiaId: number;
  status: StatusAtivo;
  dataCriacao: string;
  ultimoAcesso: string;
  permissoes: Permissao[];
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  genero: 'masculino' | 'feminino' | 'outro';
  endereco: Endereco;
  planoId: number;
  academiaId: number;
  status: StatusAtivo;
  dataMatricula: string;
  dataVencimento: string;
  objetivos: string[];
  restricoes: string[];
  avaliacoesFisicas: AvaliacaoFisicaResumida[];
  historicoVisitas: HistoricoVisita[];
  historicoPlanos: HistoricoPlano[];
  statusPagamento: {
    ultimoPagamento: string;
    proximoVencimento: string;
    situacao: 'Em dia' | 'Atrasado' | 'Pendente';
  };
}

export interface AvaliacaoFisicaResumida {
  id: number;
  data: string;
  peso: number;
  altura: number;
  imc: number;
  percentualGordura: number;
  medidas: {
    braco: number;
    antebraco: number;
    peitoral: number;
    cintura: number;
    quadril: number;
    coxa: number;
    panturrilha: number;
  };
}

export interface HistoricoVisita {
  data: string;
  horaEntrada: string;
  horaSaida: string;
  duracao: number;
  aulasRealizadas: string[];
}
