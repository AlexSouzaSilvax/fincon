import { ModelComboBox } from '../fincon/model/ModelComboBox';

//LOCAL
//export const API = "http://localhost:8080/api";
//HML
//export const API = 'https://hml-api-fincon.herokuapp.com/api';
//PROD
export const API = "https://api-fincon.herokuapp.com/api";

export function _numberToReal(n: number) {
  return (
    'R$ ' +
    n
      .toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
  );
}

export function _formatData(data: String) {
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

export const listaMesReferencia: ModelComboBox[] = [
  { value: 1, valueText: 'Janeiro' },
  { value: 2, valueText: 'Fevereiro' },
  { value: 3, valueText: 'Março' },
  { value: 4, valueText: 'Abril' },
  { value: 5, valueText: 'Maio' },
  { value: 6, valueText: 'Junho' },
  { value: 7, valueText: 'Julho' },
  { value: 8, valueText: 'Agosto' },
  { value: 9, valueText: 'Setembro' },
  { value: 10, valueText: 'Outubro' },
  { value: 11, valueText: 'Novembro' },
  { value: 12, valueText: 'Dezembro' },  
];

export const listaAnoReferencia: ModelComboBox[] = [
  { value: 2022, valueText: '2022' },
  { value: 2023, valueText: '2023' },
  { value: 2024, valueText: '2024' },
  { value: 2025, valueText: '2025' },
  { value: 2026, valueText: '2026' },
  { value: 2027, valueText: '2027' },
  { value: 2028, valueText: '2028' },
  { value: 2029, valueText: '2029' },
  { value: 2030, valueText: '2030' },  
];

export function getMesAnoAtual() {
  var d = new Date();
  return { mes: (d.getMonth()+1), ano: d.getFullYear() };
}

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
    } else if (e.value.toString() == valueText) {
      value = e.valueText
    }
  });
  return value;
}

export function formatDataInput(data: String) {
  if (data) {
    return data.substring(0, 10);
  }
  return;
}
