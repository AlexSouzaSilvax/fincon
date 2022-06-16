export interface Lancamento {
  id: Number;
  descricao: String;
  valor: Number;
  mensal: Boolean;
  pago: Boolean;
  observacao: String;
  tipo_lancamento: String;
  tipo_pagamento: String;
  quantidade_parcelas: Number;
  numero_parcela: Number;
  mes_referencia: Number;
  ano_referencia: Number;
  data_lancamento: String;
  data_vencimento: String;
  data_prevista_pagamento: String;
  data_pagamento: String;
}
