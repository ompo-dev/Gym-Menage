import type { MetodoPagamento } from './common';

export interface Pagamento {
  id: number;
  clienteId: number;
  planoId: number;
  valor: number;
  status: 'pago' | 'pendente' | 'atrasado' | 'cancelado';
  metodoPagamento: MetodoPagamento;
  dataVencimento: string;
  dataPagamento: string;
  comprovante: string;
  academiaId: number;
}

export interface Venda {
  id: number;
  clienteId: number;
  data: string;
  itens: {
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    desconto: number;
    total: number;
  }[];
  formaPagamento: MetodoPagamento;
  status: 'concluida' | 'pendente' | 'cancelada';
  total: number;
  notaFiscal: string;
}

export interface Metricas {
  frequencia: {
    data: string;
    academiaId: number;
    total: number;
    porHora: {
      [hora: string]: number;
    };
  }[];
  financeiro: {
    receitas: {
      mes: string;
      academiaId: number;
      mensalidades: number;
      matriculas: number;
      produtos: number;
      total: number;
    }[];
    despesas: {
      mes: string;
      academiaId: number;
      funcionarios: number;
      aluguel: number;
      energia: number;
      agua: number;
      manutencao: number;
      marketing: number;
      outros: number;
      total: number;
    }[];
    indicadores: {
      crescimentoMensal: {
        mes: string;
        percentual: number;
        novosClientes: number;
        cancelamentos: number;
      };
      taxaRetencao: number;
      ticketMedio: number;
    };
  };
  aulas: {
    agendadas: number;
    realizadas: number;
    canceladas: number;
    ocupacaoMedia: number;
  };
  treinos: {
    distribuicaoDiaria: {
      dia: string;
      realizados: number;
      perdidos: number;
      ocupacao: number;
    }[];
  };
}

export interface Relatorio {
  templates: {
    id: number;
    nome: string;
    tipo: string;
    campos: string[];
    periodicidade: string;
    destinatarios: string[];
  }[];
  agendados: {
    id: number;
    templateId: number;
    dataGeracao: string;
    periodo: string;
    status: string;
    url: string;
  }[];
}
