import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { API } from '../../shared/Util';
import { Usuario } from '../model/Usuario';
import { UsuarioAccessDTO } from '../model/UsuarioAccessDTO';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  access(record: UsuarioAccessDTO) {
    return this.httpClient
      .post<Usuario>(`${API}/usuario/access`, record)
      .pipe(first());
  }

  save(record: Usuario) {
    if (record.id) {
      return this.httpClient
        .post<Usuario>(`${API}/usuario/update`, record)
        .pipe(first());
    } else {
      return this.httpClient
        .post<Usuario>(`${API}/usuario/create`, record)
        .pipe(first());
    }
  }

  delete(id: string) {
    return this.httpClient
      .post<String>(`${API}/usuario/delete`, id)
      .pipe(first());
  }
}
