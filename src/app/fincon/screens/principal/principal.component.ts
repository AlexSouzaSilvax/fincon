import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FiltroDialogComponent } from 'src/app/shared/components/filtro-dialog/filtro-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {
  _changeIsPago,
  _findStringByValue,
  _formatData,
  _formatDia,
  _numberToReal,
  findTipo,
  listaAnoReferencia,
  listaCategorias,
  listaMesReferencia,
  listaTipoLancamentos,
  listaTipoPagamentos,
} from '../../../shared/Util';
import { Lancamento } from '../../model/Lancamento';
import { LancamentoListaDTO } from '../../model/LancamentoListaDTO';
import { ModelComboBox } from '../../model/ModelComboBox';
import { LancamentoService } from '../../services/lancamento.service';
import { LancamentoEdit } from '../../services/LancamentoEdit.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MesAnoReferenciaService } from '../../services/mesAnoReferencia.service';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  lancamentos$!: Observable<[LancamentoListaDTO]>;
  listaLancamentos: any[] = [];
  listaLancamentos2: any[] = [];
  listaLancamentosFiltro: any = null;
  totalEntrada$: string;
  totalSaida$: string;
  saldo$: string;
  poupanca$: string;
  investimentos$: string;

  load: boolean = true;

  saldoPositivo: boolean = true;

  idUsuario!: string;

  mesReferencia: any;
  anoReferencia: any;

  mesesReferencia: ModelComboBox[] = listaMesReferencia;
  anosReferencia: ModelComboBox[] = listaAnoReferencia;

  mesAnoReferencia!: string;

  form: FormGroup;

  displayedColumns: string[] = [
    //'id',
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

  pesquisa: any = '';

  _listaCategorias = listaCategorias;
  _listaTipoPagamentos = listaTipoPagamentos;

  constructor(
    private lancamentosService: LancamentoService,
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private serviceLS: LocalStorageService,
    private formBuilder: FormBuilder,
    private lancamentoEdit: LancamentoEdit,
    private mesAnoReferenciaService: MesAnoReferenciaService
  ) {
    // INICIA TELA SEMPRE NO TOPO
    window.scrollTo(0, 0);

    this.totalEntrada$ = this.numberToReal(0);
    this.totalSaida$ = this.numberToReal(0);
    this.saldo$ = this.numberToReal(0);
    this.poupanca$ = this.numberToReal(0);
    this.investimentos$ = this.numberToReal(0);

    const { mes, ano } = this.mesAnoReferenciaService.getMesAnoAtual();
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
    this.onLancamentos();
  }

  ngOnInit(): void {
    this.idUsuario = this.serviceLS.get('id');
    if (this.idUsuario == null) {
      this.router.navigate([''], { relativeTo: this.route });
    }
  }

  async onLancamentos() {
    this.pesquisa = '';
    this.load = true;
    this.listaLancamentos = [];
    this.listaLancamentos2 = [null];

    if (this.idUsuario == null) {
      this.idUsuario = this.serviceLS.get('id');
    }
    this.lancamentos$ = await this.lancamentosService
      .listMain(this.idUsuario, this.mesReferencia, this.anoReferencia)
      .pipe(
        tap((l) => this.somaValores(l)),
        catchError((error) => {
          if (error.status == 500) {
            this.onMessage(`#${error.status} Falha no sistema`);
          } else {
            this.onError('Sem conexão com o servidor');
            this.load = false;
            //this.onLogout();
          }
          return [];
        })
      );

    this.lancamentos$.forEach((e) => {
      this.listaLancamentos = e;
      this.listaLancamentos2 = e;
    });

    if (this.listaLancamentos2[0] == null) {
      this.listaLancamentos = [];
      this.listaLancamentos2 = [];
    }
  }

  somaValores(lancamentos: Array<LancamentoListaDTO>) {
    var somaEntradas: any = 0;
    var somaSaidas: any = 0;
    var somaPoupancaEntradas: any = 0;
    var somaPoupancaSaidas: any = 0;
    var somaInvestimentosEntradas: any = 0;
    var somaInvestimentosSaidas: any = 0;
    for (var i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].pago) {
        if (lancamentos[i].tipo_lancamento == 1) {
          //Saída
          somaSaidas += lancamentos[i].valor;
        }
        if (lancamentos[i].tipo_lancamento == 0) {
          //Entrada
          somaEntradas += lancamentos[i].valor;
        }
        if (lancamentos[i].categoria == 21) {
          //Poupança
          if (lancamentos[i].tipo_lancamento == 0) {
            //Saída
            somaPoupancaEntradas += lancamentos[i].valor;
          }
          if (lancamentos[i].tipo_lancamento == 0) {
            //Entrada
            somaPoupancaSaidas += lancamentos[i].valor;
          }
        }
        if (lancamentos[i].categoria == 10) {
          //Investimentos
          if (lancamentos[i].tipo_lancamento == 1) {
            //Saída
            somaInvestimentosEntradas += lancamentos[i].valor;
          }
        }
      }
    }
    this.totalEntrada$ = this.numberToReal(somaEntradas);
    this.totalSaida$ = this.numberToReal(somaSaidas);
    this.saldo$ = this.numberToReal(somaEntradas - somaSaidas);
    this.poupanca$ = this.numberToReal(
      somaPoupancaEntradas - somaPoupancaSaidas
    );
    this.investimentos$ = this.numberToReal(
      somaInvestimentosEntradas - somaInvestimentosSaidas
    );
    if (somaEntradas < somaSaidas) {
      this.saldoPositivo = false;
    } else {
      this.saldoPositivo = true;
    }
    this.load = false;
  }

  onError(errorMsg: string) {
    //this.dialog.open(ErrorDialogComponent, { data: errorMsg });
    this.snackbar.open(errorMsg, '', { duration: 5000 });
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
        this.onSuccess('Apagado com sucesso');
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
        mesReferencia: this.mesReferencia,
        anoReferencia: this.anoReferencia,
        categorias: listaCategorias,
        lancamentos: listaTipoLancamentos,
        pagamentos: listaTipoPagamentos,
        form: this.form,
        mesesReferencia: this.mesesReferencia,
        anosReferencia: this.anosReferencia,
        onConfirm: () => this.filtroLista(),
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
      if (this.listaLancamentosFiltro != null) {
        this.listaLancamentos2 = this.filtroCampos(this.listaLancamentosFiltro);
      } else {
        this.listaLancamentos2 = this.filtroCampos(this.listaLancamentos);
      }
    } else {
      if (this.form.value.mesReferencia == 0) {
        this.mesAnoReferencia = `Todos de ${findTipo(
          this.form.value.anoReferencia,
          this.anosReferencia
        )}`;
      } else {
        this.mesAnoReferencia = `${findTipo(
          this.form.value.mesReferencia,
          this.mesesReferencia
        )} de ${findTipo(this.form.value.anoReferencia, this.anosReferencia)}`;
      }

      this.mesReferencia = this.form.value.mesReferencia;
      this.anoReferencia = this.form.value.anoReferencia;

      this.mesAnoReferenciaService.setMes(this.form.value.mesReferencia);
      this.mesAnoReferenciaService.setAno(this.form.value.anoReferencia);
      this.pesquisa = '';
      this.onLancamentos();
    }
    this.somaValores(this.listaLancamentos2);
    this.pesquisa = '';
    this.dialog.closeAll();
  }

  filtroCampos(listaFiltro: LancamentoListaDTO[]) {
    //pago
    if (this.form.value.pago != null) {
      listaFiltro = listaFiltro.filter((e) => e.pago == this.form.value.pago);
      this.listaLancamentosFiltro = listaFiltro;
    }
    //tipo_pagamento
    if (listaTipoPagamentos[this.form.value.tipo_pagamento] != null) {
      listaFiltro = listaFiltro.filter(
        (e) =>
          e.tipo_pagamento ==
          listaTipoPagamentos[this.form.value.tipo_pagamento].value
      );
      this.listaLancamentosFiltro = listaFiltro;
    }
    //tipo_lancamento
    if (listaTipoLancamentos[this.form.value.tipo_lancamento] != null) {
      listaFiltro = listaFiltro.filter(
        (e) =>
          e.tipo_lancamento ==
          listaTipoLancamentos[this.form.value.tipo_lancamento].value
      );
      this.listaLancamentosFiltro = listaFiltro;
    }
    //categoria
    if (listaCategorias[this.form.value.categoria] != null) {
      listaFiltro = listaFiltro.filter(
        (e) => e.categoria == listaCategorias[this.form.value.categoria].value
      );
      this.listaLancamentosFiltro = listaFiltro;
    }
    //quinzena
    if (this.form.value.quinzena != null) {
      if (this.form.value.quinzena == 1) {
        listaFiltro = listaFiltro.filter(
          (e) => this.formatDia(e.data_prevista_pagamento) <= 15
        );
        this.listaLancamentosFiltro = listaFiltro;
      }
      if (this.form.value.quinzena == 2) {
        listaFiltro = listaFiltro.filter(
          (e) => this.formatDia(e.data_prevista_pagamento) > 15
        );
        this.listaLancamentosFiltro = listaFiltro;
      }
    }

    this.listaLancamentosFiltro = null;
    return listaFiltro;
  }

  onPesquisa() {
    this.listaLancamentos2 = this.listaLancamentos.filter((item) =>
      item.descricao.toLowerCase().includes(this.pesquisa.toLowerCase())
    );
  }

  limparFiltros() {
    this.form = this.formBuilder.group({
      mesReferencia: [this.mesReferencia],
      anoReferencia: [this.anoReferencia],
      categoria: [null],
      pago: [null],
      tipo_lancamento: [null],
      tipo_pagamento: [null],
      quinzena: [null],
    });
    this.pesquisa = '';
    this.listaLancamentos2 = this.listaLancamentos;
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
  onLogout() {
    this.serviceLS.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }
  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 1000,
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  findStringByValue(value: Number, pLista: ModelComboBox[]) {
    return _findStringByValue(value, pLista);
  }
}

/*
//categoria
    if (listaCategorias[this.form.value.categoria] != null) {
      listaFiltro = listaFiltro.filter(
        (e) => e.categoria == listaCategorias[this.form.value.categoria].value
      );
       */
