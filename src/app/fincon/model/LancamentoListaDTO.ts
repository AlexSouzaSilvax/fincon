export interface LancamentoListaDTO {
  id: String,
  categoria: String,
  descricao: String;
  valor: number;
  pago: Boolean,
  tipo_lancamento: String;
  tipo_pagamento: String;
  data_lancamento: String;
  data_vencimento: String;
}

