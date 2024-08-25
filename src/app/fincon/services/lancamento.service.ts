import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { API } from '../../shared/Util';
import { Lancamento } from '../model/Lancamento';
import { LancamentoListaDTO } from '../model/LancamentoListaDTO';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private httpClient: HttpClient) {}

  listMain(idUsuario: string, mesReferencia: string, anoReferencia: string) {
    return this.httpClient
      .get<[LancamentoListaDTO]>(
        `${API.url}/lancamentos/find-list-main?id_usuario=${idUsuario}&mes_referencia=${mesReferencia}&ano_referencia=${anoReferencia}`
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
        .post<Lancamento>(
          `${API.url}/lancamentos/create`,
          record
        )
        .toPromise();
    } else {
      return this.httpClient
        .post<Lancamento>(
          `${API.url}/lancamentos/create`,
          record
        )
        .toPromise();
    }
  }

  delete(id: string) {
    return this.httpClient
      .post<String>(`${API.url}/lancamentos/delete`, id)
      .pipe(first());
  }
}
