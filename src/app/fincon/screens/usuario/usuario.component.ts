import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  _formatData,
  _formatData2,
  changeData,
  formatDataInput,
} from 'src/app/shared/Util';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  load: boolean = false;
  loadFind: boolean = false;
  disabledSalvar: boolean = false;

  form: FormGroup;

  actionMessage!: String;

  idUsuario!: string;

  usuario!: any;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private route: ActivatedRoute,
    private serviceLS: LocalStorageService,
    private router: Router
  ) {
    // INICIA TELA SEMPRE NO TOPO
    window.scrollTo(0, 0);
    this.idUsuario = this.serviceLS.get('id');
    if (this.idUsuario == null) {
      this.router.navigate([''], { relativeTo: this.route });
    }

    this.findById();

    this.form = this.formBuilder.group({
      id: [this.usuario.id],
      nome: [this.usuario.nome],
      email: [this.usuario.email, [Validators.required]],
      celular: [this.usuario.celular],
      username: [
        { value: this.usuario.username, disabled: true },
        [Validators.required],
      ],
      password: [this.usuario.password, [Validators.required]],
      data_criacao: [formatDataInput(this.usuario.data_criacao)],
    });
  }

  ngOnInit(): void {}

  findById() {
    this.loadFind = true;
    this.usuario = this.service.findById(this.idUsuario).subscribe(
      (result) => {
        if (result.id != null) {
          this.form = this.formBuilder.group({
            id: [result.id],
            nome: [result.nome],
            email: [result.email, [Validators.required]],
            celular: [result.celular],
            username: [
              { value: result.username, disabled: true },
              [Validators.required],
            ],
            password: [result.password, [Validators.required]],
            data_criacao: [formatDataInput(result.data_criacao)],
          });
          this.loadFind = false;
        }
      },
      (error) => {
        if (error.status == 500) {
          this.onMessage(`#${error.status} Falha no sistema`);
        } else {
          this.onMessage('Sem conexão com o servidor');
          this.loadFind = false;
          this.onVoltar();
        }
      }
    );
  }

  async onSubmit() {
    //valida campos
    if (this.validaCampos()) {
      this.load = true; // ativa load
      this.disabledSalvar = true; // inativa botao salvar
      // salva usuario
      this.usuario = this.form.value;
      this.usuario.data_criacao = changeData(this.usuario.data_criacao);
      await this.service.update(this.usuario).then(
        async (result) => {
          this.onMessage(`Salvo com sucesso`);
        },
        (error) => {
          if (error.status == 500) {
            this.onMessage(`#${error.status} Falha no sistema`);
          } else {
            this.onMessage(`Sem conexão com o servidor`);
            this.onLogout();
          }
        }
      );

      this.load = false; // inativa load
      this.disabledSalvar = false; // ativa botao salvar
    } else {
      this.onMessage('Preencha todos os campos obrigatórios');
    }
  }

  private onMessage(actionMessage: String) {}

  formatData(data: String) {
    return _formatData(data);
  }

  formatData2(data: String) {
    return _formatData2(data);
  }

  changeData(data: String) {
    this.form.value.data_criacao;
  }

  validaCampos(): boolean {
    //const { email, username, password } = this.form.value;
    const { email, password } = this.form.value;
    if (
      email != null &&
      //username != null &&
      password != null &&
      email != '' &&
      //username != '' &&
      password != ''
    ) {
      return true;
    }
    return false;
  }

  //criar um shared
  onVoltar() {
    this.location.back();
  }
  onLogout() {
    this.serviceLS.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
