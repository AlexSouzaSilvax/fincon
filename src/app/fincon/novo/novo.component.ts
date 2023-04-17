import { Component, OnInit } from '@angular/core';
import {
  changeData,
  findTipo,
  formatDataInput,
  getMesAnoAtual,
  listaCategorias,
  listaParcelas,
  listaTipoLancamentos,
  listaTipoPagamentos,
  _formatData,
} from 'src/app/shared/Util';
import { ModelComboBox } from '../model/ModelComboBox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from '../services/lancamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lancamento } from '../model/Lancamento';
import { LocalStorageService } from '../services/local-storage.service';
import { LancamentoEdit } from '../services/LancamentoEdit.service';

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

  idUsuario!: string;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private service: LancamentoService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private serviceLS: LocalStorageService,
    private router: Router,
    private lancamentoEdit: LancamentoEdit
  ) {
    const { mes, ano } = getMesAnoAtual();
    this.form = this.formBuilder.group({
      descricao: [''],
      categoria: [13],
      valor: [null, [Validators.required]],
      mensal: [false],
      pago: [false],
      observacao: [],
      tipo_lancamento: [0],
      tipo_pagamento: [1],
      quantidade_parcelas: [],
      mes_referencia: [mes],
      ano_referencia: [ano],
      data_vencimento: [],
      data_prevista_pagamento: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.idUsuario = this.serviceLS.get('id');
    if (this.idUsuario == null) {
      this.router.navigate([''], { relativeTo: this.route });
    }

    this.lancamentoEdit
      .getItems()
      .map((lancamento) => (this.lancamento = lancamento));

    if (this.lancamento) {
      this.form = this.formBuilder.group({
        id: [this.lancamento?.id],
        descricao: [this.lancamento?.descricao],
        categoria: [findTipo(this.lancamento?.categoria, this.categorias)],
        valor: [this.lancamento?.valor],
        pago: [this.lancamento?.pago],
        tipo_lancamento: [
          findTipo(this.lancamento?.tipo_lancamento, this.lancamentos),
        ],
        tipo_pagamento: [
          findTipo(this.lancamento?.tipo_pagamento, this.tipoPagamentos),
        ],
        quantidade_parcelas: [this.lancamento?.quantidade_parcelas],
        mensal: [this.lancamento?.mensal],
        mes_referencia: [this.lancamento?.mes_referencia],
        ano_referencia: [this.lancamento?.ano_referencia],
        observacao: [this.lancamento?.observacao],

        data_vencimento: [formatDataInput(this.lancamento?.data_vencimento)],
        data_prevista_pagamento: [
          formatDataInput(this.lancamento?.data_prevista_pagamento),
        ],
      });
      this.functionSelectTipoPagamento(this.lancamento.tipo_pagamento);
    }
    this.lancamentoEdit.setItems([]);
  }

  functionSelectTipoPagamento(e: any) {
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
    if (this.validaCampos()) {
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
      this.lancamento.categoria = this.lancamento?.categoria;
      this.lancamento.tipo_lancamento = this.lancamento?.tipo_lancamento;
      this.lancamento.tipo_pagamento = this.lancamento?.tipo_pagamento;

      this.service.save(this.idUsuario, this.lancamento).subscribe(
        (result) => {
          this.onMessage(`${this.actionMessage} com sucesso`);
          this.router.navigate([''], { relativeTo: this.route });
        },
        (error) => this.onMessage(`${this.actionMessage} erro`)
      );
      this.load = false; // inativa load
      this.disabledSalvar = false; // ativa botao salvar
    } else {
      this.onMessage('Preencha todos os campos obrigatórios');
    }
  }

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 1000,
    });
  }

  formatData(data: String) {
    return _formatData(data);
  }

  validaCampos(): boolean {
    const { valor, data_prevista_pagamento } = this.lancamento;
    if (valor != null && data_prevista_pagamento != null) {
      return true;
    }
    return false;
  }
}
