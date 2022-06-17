export function _numberToReal(n: number) {
  return (
    'R$ ' +
    n
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
  );
}

export function _formatData(data: string) {
  if (data) {
    const [date, time] = data.split('T');
    const [YYYY, MM, DD] = date.split('-');
    const [HH, mm] = time.split(':');
    return `${DD}/${MM}/${YYYY} ${HH}:${mm}`;
  }
  return 'Não informado';
}

export function _changePagamento(param: string) {
  switch (param) {
    case 'DINHEIRO': //0
      return 'Dinheiro';
    case 'PIX': //1
      return 'Pix';
    case 'DEBITO': //2
      return 'Débito';
    case 'CREDITO': //3
      return 'Crédito';
    case 'BOLETO': //4
      return 'Boleto';
      case 'TED': //5
      return 'Transferência';
  }
  return param;
}
