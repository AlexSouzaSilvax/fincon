export interface LancamentoListaDTO {
  id: String,
  categoria: Number,
  descricao: String;
  valor: Number;
  pago: Boolean,
  tipo_lancamento: Number;
  tipo_pagamento: Number;
  data_lancamento: String;
  data_vencimento: String;
  data_prevista_pagamento: String;
}

