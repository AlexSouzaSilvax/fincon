import { LancamentoEdit } from './../services/LancamentoEdit.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { LancamentoService } from '../services/lancamento.service';
import {
  _numberToReal,
  _formatData,
  _changeIsPago,
  findTipo,
  listaMesReferencia,
  listaAnoReferencia,
  getMesAnoAtual,
  listaTipoLancamentos,
  listaTipoPagamentos,
  _formatDia,
} from '../../shared/Util';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../services/local-storage.service';
import { ModelComboBox } from '../model/ModelComboBox';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltroDialogComponent } from 'src/app/shared/components/filtro-dialog/filtro-dialog.component';
import { listaCategorias } from '../../shared/Util';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  lancamentos$!: Observable<[LancamentoListaDTO]>;
  listaLancamentos: any[] = [];
  listaLancamentos2: any[] = [];
  //dataSource = this.lancamentos$;
  totalEntrada$: string;
  totalSaida$: string;
  saldo$: string;
  poupanca$: string;
  investimentos$: string;

  load: boolean = false;

  saldoPositivo: any = null;

  idUsuario!: string;

  mesReferencia: any;
  anoReferencia: any;

  mesesReferencia: ModelComboBox[] = listaMesReferencia;
  anosReferencia: ModelComboBox[] = listaAnoReferencia;

  mesAnoReferencia!: string;

  form: FormGroup;

  displayedColumns: string[] = [
    'id',
    'categoria',
    'descricao',
    'valor',
    'tipo_pagamento',
    'data_prevista_pagamento',
    'data_vencimento',    
    'pago',
    'actions',
  ];

  items: any[] = [];

  constructor(
    private lancamentosService: LancamentoService,
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private serviceLS: LocalStorageService,
    private formBuilder: FormBuilder,
    private lancamentoEdit: LancamentoEdit
  ) {
    // INICIA TELA SEMPRE NO TOPO    
    window.scrollTo(0, 0);
    
    this.totalEntrada$ = '';
    this.totalSaida$ = '';
    this.saldo$ = '';
    this.poupanca$ = '';
    this.investimentos$ = '';

    const { mes, ano } = getMesAnoAtual();
    this.mesReferencia = mes;
    this.anoReferencia = ano;

    this.form = this.formBuilder.group({
      mesReferencia: [this.mesReferencia],
      anoReferencia: [this.anoReferencia],
      categoria: [null],
      pago: [null],
      tipo_lancamento: [null],
      tipo_pagamento: [null],
      quinzena: [null],
    });
    this.mesAnoReferencia = `${findTipo(
      this.mesReferencia,
      listaMesReferencia
    )} de ${this.anoReferencia}`;
  }

  ngOnInit(): void {    
    this.idUsuario = this.serviceLS.get('id');
    if (this.idUsuario == null) {
      this.router.navigate([''], { relativeTo: this.route });
    }        
    this.onLancamentos();
  }

  onLancamentos() {
    this.load = true;    
    this.listaLancamentos = [];
    this.listaLancamentos2 = [];
    
    if (this.idUsuario == null) {
      this.idUsuario = this.serviceLS.get('id');
    }
    this.lancamentos$ = this.lancamentosService
      .listMain(this.idUsuario, this.mesReferencia, this.anoReferencia)
      .pipe(
        tap((l) => this.somaValores(l)),
        catchError((error) => {
          this.onError('Não foi possível carregar os lançamentos');
          return [];
        })
      );
    this.lancamentos$.forEach((e) => {      
      this.listaLancamentos = e;
      this.listaLancamentos2 = e;
    });
    //////this.load = false;
  }

  somaValores(lancamentos: Array<LancamentoListaDTO>) {
    ////this.load = false;
    var somaEntradas: any = 0;
    var somaSaidas: any = 0;
    var somaPoupancaEntradas: any = 0;
    var somaPoupancaSaidas: any = 0;
    var somaInvestimentosEntradas: any = 0;
    var somaInvestimentosSaidas: any = 0;
    for (var i = 0; i < lancamentos.length; i++) {
      // if (lancamentos[i].pago) {
      if (lancamentos[i].tipo_lancamento == 'Saída') {
        somaSaidas += lancamentos[i].valor;
      }
      if (lancamentos[i].tipo_lancamento == 'Entrada') {
        somaEntradas += lancamentos[i].valor;
      }
      if (lancamentos[i].categoria == 'Poupança') {
        if (lancamentos[i].tipo_lancamento == 'Saída') {
          somaPoupancaEntradas += lancamentos[i].valor;
        }
        if (lancamentos[i].tipo_lancamento == 'Entrada') {
          somaPoupancaSaidas += lancamentos[i].valor;
        }
      }
      if (lancamentos[i].categoria == 'Investimentos') {
        if (lancamentos[i].tipo_lancamento == 'Saída') {
          somaInvestimentosEntradas += lancamentos[i].valor;
        }
        if (lancamentos[i].tipo_lancamento == 'Entrada') {
          somaInvestimentosSaidas += lancamentos[i].valor;
        }
      }
      // }
    }
    this.totalEntrada$ = this.numberToReal(somaEntradas);
    this.totalSaida$ = this.numberToReal(somaSaidas);
    this.saldo$ = this.numberToReal(somaEntradas - somaSaidas);
    this.poupanca$ = this.numberToReal(
      somaPoupancaEntradas - somaPoupancaSaidas
    );
    this.investimentos$ = this.numberToReal(somaInvestimentosEntradas - somaInvestimentosSaidas);
    if (somaEntradas < somaSaidas) {
      this.saldoPositivo = false;
    } else {
      this.saldoPositivo = true;
    }
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, { data: errorMsg });
    //this.snackbar.open(errorMsg, '', { duration: 5000 });
    ////this.load = false;
  }

  onAdd() {}

  //criar um shared
  onCancel() {
    this.location.back();
  }

  onEdit(pLancamento: Lancamento) {
    this.items.push(pLancamento);
    this.lancamentoEdit.setItems(this.items);
    this.router.navigate(['detalhe'], { relativeTo: this.route });
  }

  private onSuccess(actionMessage: string) {
    this.snackbar.open(actionMessage, '', { duration: 5000 });
    this.onLancamentos(); //  alterar para apenas manipular a lista,  no caso remover o item selecionado
  }

  onClickDelete(id: string) {
    this.openDialog(
      'Deseja realmente apagar ?',
      'Esta ação não poderá ser revertida',
      async () => this.onDelete(id)
    );
  }

  openDialog(pTitle: string, pDescription: string, pOnConfirm: () => {}) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: pTitle,
        description: pDescription,
        onConfirm: pOnConfirm,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onDelete(id: string) {
    this.lancamentosService.delete(id).subscribe(
      (result) => {
        this.onSuccess('Lançamento apagado com sucesso');
      },
      (error) => {
        this.onError('Não foi possivel apagar este lançamento');
      }
    );
  }

  novo() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  filtrar() {
    const dialogRef = this.dialog.open(FiltroDialogComponent, {
      data: {
        title: 'Filtros',
        description: 'teste',
        mesReferencia: this.mesReferencia,
        anoReferencia: this.anoReferencia,
        categorias: listaCategorias,
        lancamentos: listaTipoLancamentos,
        pagamentos: listaTipoPagamentos,
        form: this.form,
        mesesReferencia: this.mesesReferencia,
        anosReferencia: this.anosReferencia,
        onConfirm: () => {
          this.mesAnoReferencia = `${findTipo(
            this.form.value.mesReferencia,
            this.mesesReferencia
          )} de ${findTipo(
            this.form.value.anoReferencia,
            this.anosReferencia
          )}`;
          this.mesReferencia = this.form.value.mesReferencia;
          this.anoReferencia = this.form.value.anoReferencia;
          this.filtroLista();
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  filtroLista() {
    if (
      this.form.value.pago != null ||
      this.form.value.tipo_pagamento != null ||
      this.form.value.tipo_lancamento != null ||
      this.form.value.categoria != null ||
      this.form.value.quinzena != null
    ) {
      if (this.form.value.pago != null) {
        this.listaLancamentos2 = this.listaLancamentos.filter(
          (e) => e.pago == this.form.value.pago
        );
      }
      if (this.form.value.tipo_pagamento != null) {
        this.listaLancamentos2 = this.listaLancamentos.filter(
          (e) =>
            e.tipo_pagamento ==
            listaTipoPagamentos[this.form.value.tipo_pagamento].valueText
        );
      }
      if (this.form.value.tipo_lancamento != null) {
        this.listaLancamentos2 = this.listaLancamentos.filter(
          (e) =>
            e.tipo_lancamento ==
            listaTipoLancamentos[this.form.value.tipo_lancamento].valueText
        );
      }
      if (this.form.value.categoria != null) {
        this.listaLancamentos2 = this.listaLancamentos.filter(
          (e) =>
            e.categoria == listaCategorias[this.form.value.categoria].valueText
        );
      }
      if (this.form.value.quinzena != null) {
        if (this.form.value.quinzena == 1) {
          this.listaLancamentos2 = this.listaLancamentos.filter(
            (e) => this.formatDia(e.data_prevista_pagamento) <= 15
          );
        }
        if (this.form.value.quinzena == 2) {
          this.listaLancamentos2 = this.listaLancamentos.filter(
            (e) => this.formatDia(e.data_prevista_pagamento) > 15
          );
        }
      }
    } else {
      this.onLancamentos();
    }
    this.somaValores(this.listaLancamentos2);
  }

  numberToReal(param: number) {
    return _numberToReal(param);
  }

  formatData(data: string) {
    return _formatData(data);
  }

  changeIsPago(pago: boolean) {
    return _changeIsPago(pago);
  }

  formatDia(data: String) {
    return Number(_formatDia(data));
  }
}
