import { Endereco, HorarioFuncionamento, Modalidade, StatusAtivo } from './common';

export interface Academia {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  plano: string;
  status: StatusAtivo;
  dataCriacao: string;
  horarioFuncionamento: HorarioFuncionamento;
  modalidades: Modalidade[];
}

export interface RedeAcademia {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  matriz: {
    academiaId: number;
    endereco: Endereco;
  };
  filiais: number[];
  responsavel: {
    nome: string;
    email: string;
    telefone: string;
    cargo: string;
  };
  planoExpansao: {
    metaFiliais: number;
    regioesFoco: string[];
    investimentoPrevisto: number;
  };
  metricas: {
    totalAlunos: number;
    faturamentoMensal: number;
    ticketMedioRede: number;
  };
}

export interface ConfiguracaoAcademia {
  id: number;
  limites: {
    capacidade_maxima: number;
    alunos_por_aula: number;
    dias_antecedencia_agendamento: number;
  };
  notificacoes: {
    vencimento_mensalidade: boolean;
    dias_antecedencia: number;
    avaliacao_fisica: boolean;
    treino_vencido: boolean;
  };
  integracoes: {
    gateway_pagamento: string;
    envio_email: string;
    sms: string;
  };
} 