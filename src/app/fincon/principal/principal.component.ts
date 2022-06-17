import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { FinconService } from '../services/fincon.service';
import {
  _changePagamento,
  _numberToReal,
  _formatData,
} from '../../shared/Util';
import { tap } from 'rxjs/operators';

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
    'descricao',
    'valor',
    'tipo_pagamento',
    'data_lancamento',
    'actions',
  ];

  constructor(private lancamentosService: FinconService) {
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
      if (lancamentos[i].tipo_lancamento == 'SAIDA') {
        somaSaidas += lancamentos[i].valor;
      }
      if (lancamentos[i].tipo_lancamento == 'ENTRADA') {
        somaEntradas += lancamentos[i].valor;
      }
    }
    this.totalEntrada$ = this.numberToReal(somaEntradas);
    this.totalSaida$ = this.numberToReal(somaSaidas);
    this.saldo$ = this.numberToReal(somaEntradas - somaSaidas);
  }

  onError(errorMsg: string) {
    console.log(errorMsg);
  }

  ngOnInit(): void {}

  onAdd() {}

  onEdit(pLancamento: Lancamento) {}

  onClickDelete(_id: string) {}

  changePagamento(param: string) {
    return _changePagamento(param);
  }

  numberToReal(param: number) {
    return _numberToReal(param);
  }

  formatData(data: string) {
    return _formatData(data);
  }
}
