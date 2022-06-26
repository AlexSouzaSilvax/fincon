import { Component, OnInit } from '@angular/core';
import {
  changeData,
  listaCategorias,
  listaParcelas,
  listaTipoLancamentos,
  listaTipoPagamentos,
} from 'src/app/shared/Util';
import { ModelComboBox } from '../model/ModelComboBox';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FinconService } from '../services/fincon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LancamentoSaveDTO } from '../model/LancamentoSaveDTO';
import { Lancamento } from '../model/Lancamento';

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
  seasons: any = [
    { value: true, valueText: 'Sim' },
    { value: false, valueText: 'Não' },
  ];

  load: boolean = false;
  disabledSalvar: boolean = false;

  form: FormGroup;

  actionMessage!: String;
  lancamento!: Lancamento;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private service: FinconService,
    private snackbar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      descricao: [],
      categoria: [],
      valor: [],
      mensal: [false],
      pago: [false],
      observacao: [],
      tipo_lancamento: [],
      tipo_pagamento: [],
      quantidade_parcelas: [],
      mes_referencia: [],
      ano_referencia: [],
      data_vencimento: [],
      data_prevista_pagamento: [],
    });
  }

  ngOnInit(): void {}

  fucntionSelectTipoPagamento(e: any) {
    if (e == 3) {
      this.selectTipoPagamento = new FormControl(false);
    } else {
      this.selectTipoPagamento = new FormControl(true);
    }
  }

  //criar um shared
  onVoltar() {
    this.location.back();
  }

  onSubmit() {
    this.lancamento = this.form.value;

    //valida campos
    this.load = true; // ativa load
    this.disabledSalvar = true; // inativa botao salvar
    // salva lancamento
    this.actionMessage = 'Salvo';
    if (this.lancamento?.id != null) {
      this.actionMessage = 'Atualizado';
    }

    this.lancamento.data_vencimento = changeData(
      this.lancamento.data_vencimento
    );
    this.lancamento.data_prevista_pagamento = changeData(
      this.lancamento.data_prevista_pagamento
    );

    console.log(this.lancamento);

    this.service.save(this.lancamento).subscribe(
      (result) => this.onSuccess(result, this.actionMessage),
      (error) => this.onError(this.actionMessage)
    );
    this.load = false; // inativa load
    this.disabledSalvar = false; // ativa botao salvar
  }

  private onSuccess(result: LancamentoSaveDTO, actionMessage: String) {
    if (result.id != null) {
      this.snackbar.open(`${actionMessage} com sucesso`, '', {
        duration: 5000,
      });
    }
  }

  private onError(actionMessage: String) {
    this.snackbar.open(`error ${actionMessage}`, '', { duration: 5000 });
  }
}
