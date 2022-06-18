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

export function _changeIsPago(pago: boolean) {
  var p = '';
  if (pago) {
    p = 'Pago';
  } else {
    p = 'Não Pago';
  }
  return p;
}
