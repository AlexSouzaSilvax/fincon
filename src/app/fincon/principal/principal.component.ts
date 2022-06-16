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
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  lancamentos$!: Observable<LancamentoListaDTO[]>;
  dataSource = this.lancamentos$;
  totalEntrada$: string;

  displayedColumns: string[] = [
    'descricao',
    'valor',
    'tipo_pagamento',
    'data_lancamento',
    'actions',
  ];

  constructor(private lancamentosService: FinconService) {
    this.totalEntrada$ = '';
    this.onLancamentos();    
  }

  onLancamentos() {
    this.lancamentos$ = this.lancamentosService.listMain('6', '2022').pipe(
      tap((l) => {      
        l.length;  
        this.totalEntrada$ = this.numberToReal(this.somaValores(l));
      }),
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

  somaValores(param: Array<LancamentoListaDTO>) {
    var soma: any = 0;
    for (var i = 0; i < param.length; i++) {
      console.log('TIPO_LANCAMENTO= ' + param[i].tipo_lancamento); //SAIDA //ENTRADA
      soma += param[i].valor;
    }
    return soma;
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
