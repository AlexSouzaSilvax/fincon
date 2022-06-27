import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';
import { first } from 'rxjs/operators';
import { API } from '../../shared/Util';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private httpClient: HttpClient) {}

  listMain(mesReferencia: string, anoReferencia: string) {
    return this.httpClient
      .get<LancamentoListaDTO[]>(
        `${API}/lancamentos/find-list-main?mes_referencia=${mesReferencia}&ano_referencia=${anoReferencia}`
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
        .post<Lancamento>(`${API}/lancamentos/update`, record)
        .pipe(first());
    } else {
      return this.httpClient
        .post<Lancamento>(`${API}/lancamentos/create`, record)
        .pipe(first());
    }
  }

  delete(id: string) {
    return this.httpClient.post<String>(`${API}/lancamentos/delete`, id).pipe(first());
  }
}
