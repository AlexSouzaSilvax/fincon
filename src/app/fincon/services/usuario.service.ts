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
      .get<Usuario>(`${API.url}/user/find-by-id?id=${idUsuario}`)
      .pipe(first());
  }

  access(record: UsuarioAccessDTO) {
    return this.httpClient
      .post<UsuarioAccessDTO>(`${API.url}/auth/login`, record)
      .toPromise();
  }

  update(record: Usuario) {
    return this.httpClient
      .post<Usuario>(`${API.url}/user/update`, record)
      .toPromise();
  }

  register(record: UsuarioRegister) {
    return this.httpClient
      .post<UsuarioRegister>(`${API.url}/auth/register`, record)
      .toPromise();
  }

  delete(id: string) {
    return this.httpClient
      .post<String>(`${API.url}/user/delete`, id)
      .pipe(first());
  }

  esqueciSenha(record: String) {
    return this.httpClient
      .post<String>(`${API.url}/user/esqueci-senha`, record)
      .toPromise();
  }
}
