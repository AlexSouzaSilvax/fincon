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
  //private API = 'http://localhost:8080/api/lancamentos';

  constructor(private httpClient: HttpClient) {}

  listMain(mesReferencia: string, anoReferencia: string) {
    return this.httpClient
      .get<LancamentoListaDTO[]>(
        `${this.API}/find-list-main?mes_referencia=${mesReferencia}&ano_referencia=${anoReferencia}`
      )
      .pipe(
        first()
        //delay(1500),
        //,tap((l) => console.log(l))
      );
  }

  save(record: Lancamento) {
    if (record.id) {
      return this.httpClient
        .post<Lancamento>(`${this.API}/update`, record)
        .pipe(first());
    } else {
      return this.httpClient
        .post<Lancamento>(`${this.API}/create`, record)
        .pipe(first());
    }
  }

  delete(id: string) {
    return this.httpClient.post<String>(`${this.API}/delete`, id).pipe(first());
  }
}
