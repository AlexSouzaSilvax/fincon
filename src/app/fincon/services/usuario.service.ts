import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { API } from '../../shared/Util';
import { Usuario } from '../model/Usuario';
import { UsuarioAccessDTO } from '../model/UsuarioAccessDTO';
import { UsuarioRegister } from '../model/UsuarioRegister';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  findById(idUsuario: string) {
    return this.httpClient
      .get<Usuario>(`${API.url}/usuario/find-by-id?id=${idUsuario}`)
      .pipe(
        first()
        //delay(1500),
        //,tap((l) => console.log(l))
      );
  }

  access(record: UsuarioAccessDTO) {
    return this.httpClient
      .post<UsuarioAccessDTO>(`${API.url}/auth/login`, record)
      .toPromise();
  }

  save(record: Usuario) {
    if (record.id) {
      return this.httpClient
        .post<Usuario>(`${API.url}/usuario/update`, record)
        .toPromise();
      //.pipe(first());
    } else {
      return this.httpClient
        .post<Usuario>(`${API.url}/auth/register`, record)
        .toPromise();
      //.pipe(first());
    }
  }

  register(record: UsuarioRegister) {
    return this.httpClient
      .post<UsuarioRegister>(`${API.url}/auth/register`, record)
      .toPromise();
  }

  delete(id: string) {
    return this.httpClient
      .post<String>(`${API.url}/usuario/delete`, id)
      .pipe(first());
  }

  esqueciSenha(record: String) {
    return this.httpClient
      .post<String>(`${API.url}/user/esqueci-senha`, record)
      .toPromise();
  }
}
