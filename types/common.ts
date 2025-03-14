export interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface HorarioFuncionamento {
  segunda_sexta: {
    abertura: string;
    fechamento: string;
  };
  sabado: {
    abertura: string;
    fechamento: string;
  };
  domingo: {
    abertura: string;
    fechamento: string;
  };
}

export type StatusAtivo = "ativo" | "inativo" | "pendente" | "bloqueado";
export type MetodoPagamento = "cartao_credito" | "cartao_debito" | "pix" | "boleto" | "dinheiro";
export type Modalidade = "musculação" | "crossfit" | "pilates" | "yoga" | "spinning" | "cardio";
export type NivelTreino = "iniciante" | "intermediario" | "avancado";
export type DiaSemana = "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado" | "domingo";

export interface PeriodoDisponivel {
  periodo: "mensal" | "trimestral" | "semestral" | "anual";
  valor: number;
  desconto: number;
} 