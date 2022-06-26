import { ModelComboBox } from '../fincon/model/ModelComboBox';

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

export const listaTipoLancamentos: ModelComboBox[] = [
  { value: 0, valueText: 'Entrada' },
  { value: 1, valueText: 'Saída' },
];

export const listaCategorias: ModelComboBox[] = [
  { value: 0, valueText: 'Alimentação' },
  { value: 1, valueText: 'Assinaturas/Serviços' },
  { value: 2, valueText: 'Bares/Restaurantes' },
  { value: 3, valueText: 'Casa' },
  { value: 4, valueText: 'Compras' },
  { value: 5, valueText: 'Cuidados Pessoais' },
  { value: 6, valueText: 'Dívidas/Emprestimos' },
  { value: 7, valueText: 'Educação' },
  { value: 8, valueText: 'Família' },
  { value: 9, valueText: 'Impostos/Taxas' },
  { value: 10, valueText: 'Investimentos' },
  { value: 11, valueText: 'Lazer' },
  { value: 12, valueText: 'Mercado' },
  { value: 13, valueText: 'Outros' },
  { value: 14, valueText: 'Presentes/Doações' },
  { value: 15, valueText: 'Roupas' },
  { value: 16, valueText: 'Saúde' },
  { value: 17, valueText: 'Trabalho' },
  { value: 18, valueText: 'Transporte' },
  { value: 19, valueText: 'Viagem' },
  { value: 20, valueText: 'Combustível' },
  { value: 21, valueText: 'Poupança' },
];

export const listaTipoPagamentos: ModelComboBox[] = [
  { value: 0, valueText: 'Dinheiro' },
  { value: 1, valueText: 'Pix' },
  { value: 2, valueText: 'Débito' },
  { value: 3, valueText: 'Crédito' },
  { value: 4, valueText: 'Boleto' },
  { value: 5, valueText: 'Transferência' },
];

export const listaParcelas: ModelComboBox[] = [
  { value: 2, valueText: '2x' },
  { value: 3, valueText: '3x' },
  { value: 4, valueText: '4x' },
  { value: 5, valueText: '5x' },
  { value: 6, valueText: '6x' },
  { value: 7, valueText: '7x' },
  { value: 8, valueText: '8x' },
  { value: 9, valueText: '9x' },
  { value: 10, valueText: '10x' },
  { value: 11, valueText: '11x' },
  { value: 12, valueText: '12x' },
  { value: 24, valueText: '24x' },
  { value: 36, valueText: '36x' },
  { value: 48, valueText: '48x' },
  { value: 70, valueText: '70x' },
];

export function changeData(data: String) {
  if (data) {
    if (data.length <= 10) {
      var d = new Date();
      var newData =
        data +
        'T' +
        ('00' + d.getHours()).slice(-2) +
        ':' +
        ('00' + d.getMinutes()).slice(-2) +
        ':' +
        ('00' + d.getSeconds()).slice(-2);
      return newData;
    }
  }
  return data;
}

export function findTipo(valueText: String, lista: ModelComboBox[]) {
  let value;
  lista.forEach((e) => {
    if (e.valueText == valueText) {
      value = e.value;
    }
  });
  return value;
}

export function formatDataInput(data: String) {
  return data.substring(0, 10);
}
