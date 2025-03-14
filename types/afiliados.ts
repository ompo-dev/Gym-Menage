import { StatusAtivo } from './common';

export interface ProgramaAfiliados {
  comissoes: {
    indicacao_academia: {
      valor_base: number;
      recorrencia: {
        percentual: number;
        duracao_meses: number;
      };
    };
    indicacao_aluno: {
      valor_base: number;
      bonus_permanencia: {
        "3_meses": number;
        "6_meses": number;
        "12_meses": number;
      };
    };
  };
  afiliados: Afiliado[];
  indicacoes: Indicacao[];
}

export interface Afiliado {
  id: number;
  tipo: "academia" | "usuario";
  academiaId: number;
  dataInicio: string;
  status: StatusAtivo;
  indicacoes: {
    academias: number[];
    alunos: number[];
  };
  ganhos: {
    total: number;
    pendente: number;
    pago: number;
  };
  rankingMensal: {
    posicao: number;
    pontos: number;
  };
}

export interface Indicacao {
  id: number;
  tipo: "academia" | "aluno";
  afiliadoId: number;
  indicadoId: number;
  dataIndicacao: string;
  dataConversao: string;
  status: "pendente" | "convertido" | "cancelado";
  comissoes: {
    valor: number;
    tipo: "valor_base" | "recorrencia" | "bonus";
    status: "pendente" | "pago" | "cancelado";
    dataPagamento?: string;
    mes?: string;
  }[];
}

export interface LinkAfiliado {
  id: number;
  afiliadoId: number;
  codigo: string;
  url: string;
  tipo: "registro_academia" | "registro_aluno";
  dataCriacao: string;
  cliques: number;
  conversoes: number;
  taxaConversao: number;
}

export interface CampanhaIndicacao {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
  tipo: "alunos" | "academias";
  beneficios: {
    indicador: {
      tipo: "desconto" | "bonus" | "credito";
      valor: number;
      duracao_meses: number;
    };
    indicado: {
      tipo: "isencao_matricula" | "desconto" | "bonus";
      valor: number;
    };
  };
  regras: string[];
  status: "ativa" | "inativa" | "encerrada";
  resultados: {
    indicacoes: number;
    conversoes: number;
    taxaConversao: number;
  };
}

export interface RankingAfiliados {
  mensal: {
    mes: string;
    academias: {
      afiliadoId: number;
      pontos: number;
      indicacoes: number;
      conversoes: number;
      ganhos: number;
      posicao: number;
    }[];
    usuarios: {
      afiliadoId: number;
      pontos: number;
      indicacoes: number;
      conversoes: number;
      ganhos: number;
      posicao: number;
    }[];
  }[];
  premiacoes: {
    id: number;
    mes: string;
    categoria: "academia" | "usuario";
    posicao: number;
    premio: {
      tipo: "bonus" | "produto" | "servico";
      valor: number;
      descricao: string;
    };
  }[];
} 