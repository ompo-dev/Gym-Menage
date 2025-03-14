import { Endereco, StatusAtivo } from './common';

export interface Produto {
  id: number;
  nome: string;
  marca: string;
  categoria: string;
  descricao: string;
  preco: number;
  estoque: number;
  unidade: string;
  peso: string;
  codigoBarras: string;
  fornecedor: string;
  dataValidade: string;
  status: "disponivel" | "indisponivel" | "baixo_estoque";
  imagens: string[];
}

export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: Endereco;
  contato: string;
  categoria: string[];
  status: StatusAtivo;
}

export interface Manutencao {
  id: number;
  equipamentoId: number;
  tipo: "preventiva" | "corretiva" | "emergencial";
  status: "agendada" | "em_andamento" | "concluida" | "cancelada";
  dataAgendada: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
  descricao: string;
  tecnico: string;
  custoEstimado: number;
  pecasNecessarias: {
    nome: string;
    quantidade: number;
    valor: number;
  }[];
} 