import type { DiaSemana, NivelTreino, StatusAtivo } from './common';

export interface AvaliacaoFisica {
  id: number;
  clienteId: number;
  instrutorId: number;
  data: string;
  tipo: 'completa' | 'parcial';
  medidas: {
    peso: number;
    altura: number;
    imc: number;
    percentualGordura: number;
    massaMuscular: number;
    idadeCorporal: number;
    metabolismoBasal: number;
    medidas: {
      braco_direito: number;
      braco_esquerdo: number;
      antebraco_direito: number;
      antebraco_esquerdo: number;
      peitoral: number;
      cintura: number;
      abdomen: number;
      quadril: number;
      coxa_direita: number;
      coxa_esquerda: number;
      panturrilha_direita: number;
      panturrilha_esquerda: number;
    };
  };
  dobras: {
    triceps: number;
    biceps: number;
    subescapular: number;
    suprailiaca: number;
    abdominal: number;
    coxa: number;
    panturrilha: number;
  };
  perimetros: {
    pescoco: number;
    ombro: number;
    torax: number;
  };
  observacoes: string;
  objetivos: string[];
  restricoes: string[];
  fotos: {
    frente: string;
    costas: string;
    perfil: string;
  };
}

export interface Exercicio {
  id: number;
  nome: string;
  categoria: string;
  equipamento: string;
  tipo: string;
  gruposMusculares: string[];
  nivel: NivelTreino;
  instrucoes: string[];
  dicas: string[];
  videos: {
    execucao: string;
    comuns_erros: string;
  };
  variacoes: string[];
}

export interface FichaTreino {
  id: number;
  nome: string;
  clienteId: number;
  instrutorId: number;
  objetivo: string;
  nivel: NivelTreino;
  duracao: number;
  frequencia: DiaSemana[];
  validade: {
    inicio: string;
    fim: string;
  };
  grupos: string[];
  exercicios: {
    exercicioId: number;
    ordem: number;
    series: number;
    repeticoes: string;
    carga: string;
    descanso: string;
    observacoes: string;
    superSet: number | null;
  }[];
  observacoes: string;
  status: StatusAtivo;
}

export interface Treino {
  id: number;
  clienteId: number;
  instrutorId: number;
  nome: string;
  tipo: string;
  nivel: NivelTreino;
  dataCriacao: string;
  dataAtualizacao: string;
  exercicios: {
    nome: string;
    series: number;
    repeticoes: string;
    carga: string;
    descanso: string;
    observacoes: string;
  }[];
  status: StatusAtivo;
}
