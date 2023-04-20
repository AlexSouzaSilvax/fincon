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

  listMain(idUsuario: string, mesReferencia: string, anoReferencia: string) {
    return this.httpClient
      .get<[LancamentoListaDTO]>(
        `${API}/lancamentos/find-list-main?id_usuario=${idUsuario}&mes_referencia=${mesReferencia}&ano_referencia=${anoReferencia}`
      )
      .pipe(
        first()
        //delay(1500),
        //,tap((l) => console.log(l))
      );
  }

  save(idUsuario: string, record: Lancamento) {
    if (record.id) {
      return this.httpClient
        .post<Lancamento>(
          `${API}/lancamentos/update?id_usuario=${idUsuario}`,
          record
        )
        .toPromise();
      //.pipe(first());
    } else {
      return this.httpClient
        .post<Lancamento>(
          `${API}/lancamentos/create?id_usuario=${idUsuario}`,
          record
        )
        .toPromise();
      //.pipe(first());
    }
  }

  delete(id: string) {
    return this.httpClient
      .post<String>(`${API}/lancamentos/delete`, id)
      .pipe(first());
  }
}
