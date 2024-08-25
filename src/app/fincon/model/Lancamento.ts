export interface Lancamento {
  id: String;
  categoria: Number;
  descricao: String;
  valor: Number;
  pago: Boolean;
  mensal: Boolean;
  observacao: String;
  usuario: String;
  tipo_pagamento: Number;
  tipo_lancamento: Number;
  data_lancamento: String;
  mes_referencia: Number;
  ano_referencia: Number;
  data_vencimento: String;
  data_prevista_pagamento: String;
  quantidade_parcelas: Number;
}
