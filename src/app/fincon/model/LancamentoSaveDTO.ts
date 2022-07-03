export interface LancamentoSaveDTO {
    id: Number;
    descricao: String;
    categoria: String;
    valor: Number;
    mensal: Boolean;
    pago: Boolean;
    observacao: String;
    tipo_lancamento: String;
    tipo_pagamento: String;
    quantidade_parcelas: Number;
    mes_referencia: Number;
    ano_referencia: Number;
    data_vencimento: String;
    data_prevista_pagamento: String;
  }
  