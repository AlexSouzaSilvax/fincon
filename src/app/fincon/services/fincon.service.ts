import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FinconService {
  private API = 'https://api-fincon.herokuapp.com/api/lancamentos';

  constructor(private httpClient: HttpClient) {}

  listMain(mesReferencia: string, anoReferencia: string) {
    return this.httpClient
      .get<LancamentoListaDTO[]>(
        `${this.API}/find-list-main?mes_referencia=${mesReferencia}&ano_referencia=${anoReferencia}`
      )
      .pipe(
        first()
        //delay(1500),
        //,tap((courses) => console.log(courses))
      );
  }
}
