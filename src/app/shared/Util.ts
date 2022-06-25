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
  { value: 1, valueText: 'Alimentação' },
  { value: 2, valueText: 'Assinaturas/Serviços' },
  { value: 3, valueText: 'Bares/Restaurantes' },
  { value: 4, valueText: 'Casa' },
  { value: 5, valueText: 'Compras' },
  { value: 6, valueText: 'Cuidados Pessoais' },
  { value: 7, valueText: 'Dívidas/Emprestimos' },
  { value: 8, valueText: 'Educação' },
  { value: 9, valueText: 'Família' },
  { value: 10, valueText: 'Impostos/Taxas' },
  { value: 11, valueText: 'Investimentos' },
  { value: 12, valueText: 'Lazer' },
  { value: 13, valueText: 'Mercado' },
  { value: 14, valueText: 'Outros' },
  { value: 15, valueText: 'Presentes/Doações' },
  { value: 16, valueText: 'Roupas' },
  { value: 17, valueText: 'Saúde' },
  { value: 18, valueText: 'Trabalho' },
  { value: 19, valueText: 'Transporte' },
  { value: 20, valueText: 'Viagem' },
  { value: 21, valueText: 'Combustível' },
  { value: 22, valueText: 'Poupança' },
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
