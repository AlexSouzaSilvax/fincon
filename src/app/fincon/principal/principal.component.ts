import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { FinconService } from '../services/fincon.service';
import { _numberToReal, _formatData, _changeIsPago } from '../../shared/Util';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  lancamentos$!: Observable<LancamentoListaDTO[]>;
  dataSource = this.lancamentos$;
  totalEntrada$: string;
  totalSaida$: string;
  saldo$: string;

  displayedColumns: string[] = [
    'id',
    'categoria',
    'descricao',
    'valor',
    'tipo_pagamento',
    'data_lancamento',
    'pago',
    'actions',
  ];

  constructor(
    private lancamentosService: FinconService,
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.totalEntrada$ = '';
    this.totalSaida$ = '';
    this.saldo$ = '';
    this.onLancamentos();
  }

  onLancamentos() {
    this.lancamentos$ = this.lancamentosService.listMain('6', '2022').pipe(
      tap((l) => this.somaValores(l)),
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

  somaValores(lancamentos: Array<LancamentoListaDTO>) {
    var somaEntradas: any = 0;
    var somaSaidas: any = 0;
    for (var i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].tipo_lancamento == 'Saída') {
        somaSaidas += lancamentos[i].valor;
      }
      if (lancamentos[i].tipo_lancamento == 'Entrada') {
        somaEntradas += lancamentos[i].valor;
      }
    }
    this.totalEntrada$ = this.numberToReal(somaEntradas);
    this.totalSaida$ = this.numberToReal(somaSaidas);
    this.saldo$ = this.numberToReal(somaEntradas - somaSaidas);
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
    this.snackbar.open(errorMsg, '', { duration: 5000 });
    this.onLancamentos();
  }

  ngOnInit(): void {}

  onAdd() {}

  //criar um shared
  onCancel() {
    this.location.back();
  }

  onEdit(pLancamento: Lancamento) {}

  private onSuccess(actionMessage: string) {
    this.snackbar.open(actionMessage, '', { duration: 5000 });
    this.onLancamentos();//  alterar para apenas manipular a lista,  no caso remover o item selecionado
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

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('The dialog was closed');
    });
  }

  onDelete(id: string) {
    this.lancamentosService.delete(id).subscribe(
      (result) => {
        this.onSuccess('delete success');
      },
      (error) => {
        this.onError('delete error');
      }
    );    
  }

  novo() {
    this.router.navigate(['novo'], { relativeTo: this.route });
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
}
