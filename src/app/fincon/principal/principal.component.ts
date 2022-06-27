import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { LancamentoService } from '../services/lancamento.service';
import { _numberToReal, _formatData, _changeIsPago } from '../../shared/Util';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../services/local-storage.service';

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
  poupanca$: string;

  load: boolean = false;

  saldoPositivo: any = null;

  idUsuario!: string;

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
    private lancamentosService: LancamentoService,
    public dialog: MatDialog,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private serviceLS: LocalStorageService
  ) {
    this.totalEntrada$ = '';
    this.totalSaida$ = '';
    this.saldo$ = '';
    this.poupanca$ = '';        
  }
  
  ngOnInit(): void {
    this.idUsuario = this.serviceLS.get('id');
    if(this.idUsuario == null) {      
      this.router.navigate([''], { relativeTo: this.route });
    }
    this.onLancamentos();
  }

  onLancamentos() {
    this.load = true;
    if(this.idUsuario == null) {
      this.idUsuario = this.serviceLS.get('id');
    }
    this.lancamentos$ = this.lancamentosService.listMain(this.idUsuario, '6', '2022').pipe(
      tap((l) => this.somaValores(l)),
      catchError((error) => {
        this.onError('Não foi possível carregar os lançamentos');
        return [];
      })
    );
  }

  somaValores(lancamentos: Array<LancamentoListaDTO>) {
    this.load = false;
    var somaEntradas: any = 0;
    var somaSaidas: any = 0;
    var somaPoupanca: any = 0;
    for (var i = 0; i < lancamentos.length; i++) {
      if (lancamentos[i].tipo_lancamento == 'Saída') {
        somaSaidas += lancamentos[i].valor;
      }
      if (lancamentos[i].tipo_lancamento == 'Entrada') {
        somaEntradas += lancamentos[i].valor;
      }
      if (lancamentos[i].categoria == 'Poupança') {
        somaPoupanca += lancamentos[i].valor;
      }
    }
    this.totalEntrada$ = this.numberToReal(somaEntradas);
    this.totalSaida$ = this.numberToReal(somaSaidas);
    this.saldo$ = this.numberToReal(somaEntradas - somaSaidas);
    this.poupanca$ = this.numberToReal(somaPoupanca);
    if (somaEntradas < somaSaidas) {
      this.saldoPositivo = false;
    } else {
      this.saldoPositivo = true;
    }
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, { data: errorMsg });
    //this.snackbar.open(errorMsg, '', { duration: 5000 });
    this.load = false;
  }

  onAdd() {}

  //criar um shared
  onCancel() {
    this.location.back();
  }

  onEdit(pLancamento: Lancamento) {
    this.router.navigate(['novo', { lancamento: JSON.stringify(pLancamento) }], {
      relativeTo: this.route,
    });
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

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('The dialog was closed');
    });
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
