import { Component, OnInit } from '@angular/core';
import { listaCategorias, listaParcelas, listaTipoLancamentos, listaTipoPagamentos } from 'src/app/shared/Util';
import { ModelComboBox } from '../model/ModelComboBox';
import {FormControl} from '@angular/forms';


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

  disableSelect = new FormControl(true);
  tipoPagamentoSelecionado = '';

  constructor() {}

  ngOnInit(): void {}

  amostraDivParcelas(value: string) {
    console.log(value)
  }
}
