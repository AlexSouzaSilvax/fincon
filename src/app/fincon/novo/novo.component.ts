import { Component, OnInit } from '@angular/core';
import {
  listaCategorias,
  listaParcelas,
  listaTipoLancamentos,
  listaTipoPagamentos,
} from 'src/app/shared/Util';
import { ModelComboBox } from '../model/ModelComboBox';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html',
  styleUrls: ['./novo.component.css'],
})
export class NovoComponent implements OnInit {
  lancamentos: ModelComboBox[] = listaTipoLancamentos;
  categorias: ModelComboBox[] = listaCategorias;
  tipoPagamentos: ModelComboBox[] = listaTipoPagamentos;
  qtdParcelas: ModelComboBox[] = listaParcelas;

  selectTipoPagamento = new FormControl(true);
  tipoPagamentoSelecionado = '';

  mensalSelect = new FormControl(false);

  optionsInput: any = {
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    precision: 2,
  };

  favoriteSeason: string = '';
  seasons: string[] = ['Sim', 'Não'];

  constructor() {}

  ngOnInit(): void {}

  fucntionSelectTipoPagamento(e: any) {
    if (e == 3) {
      this.selectTipoPagamento = new FormControl(false);
    } else {
      this.selectTipoPagamento = new FormControl(true);
    }
  }


  onVoltar() {
    
  }

  onSubmit() {

  }
}
