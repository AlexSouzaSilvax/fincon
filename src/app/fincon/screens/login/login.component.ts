import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EsqueciSenhaDialogComponent } from 'src/app/shared/components/esqueci-senha-dialog/esqueci-senha-dialog.component';
import { UsuarioAccessDTO } from '../../model/UsuarioAccessDTO';
import { UsuarioRegister } from '../../model/UsuarioRegister';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'fincon',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  actionMessage!: String;
  load: boolean = false;
  btnLogin: boolean = false;
  btnCadastrese: boolean = false;
  login = new FormControl(null, [Validators.required]);
  senha = new FormControl(null, [Validators.required]);
  usuarioAccess!: UsuarioAccessDTO;
  formCadastrese: FormGroup;
  nome = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required]);
  username = new FormControl(null, [Validators.required]);
  password = new FormControl(null, [Validators.required]);
  visibleLogin: boolean = true;
  usuarioCadastro!: UsuarioRegister;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private serviceLS: LocalStorageService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      login: [this.login],
      senha: [this.senha],
    });
    this.formCadastrese = this.formBuilder.group({
      nome: [this.nome],
      email: [this.email],
      username: [this.username],
      password: [this.password],
      role: 'ADMIN',
    });
  }

  ngOnInit(): void {
    if (this.serviceLS.get('id') != null) {
      this.router.navigate(['principal'], { relativeTo: this.route });
    }
  }

  async onLogin() {
    this.usuarioAccess = {
      username: this.form.value.login.value,
      password: this.form.value.senha.value,
      token: '',
      id: '',
    };
    if (
      this._validaCampo(this.usuarioAccess.username) &&
      this._validaCampo(this.usuarioAccess.password)
    ) {
      this.load = true;
      this.btnLogin = true;
      if (this.usuarioAccess) {
        await this.service.access(this.usuarioAccess).then(
          (result?) => {
            if (result?.token) {
              this.serviceLS.set('token', result?.token);
              this.serviceLS.set('id', result?.id);
              this.serviceLS.set('username', result?.username);
              this.router.navigate(['principal'], { relativeTo: this.route });

              this.limpaFormLogin();
            }
          },
          (error) => this.retornoErro(error)
        );
      }
    }
    this.load = false;
    this.btnLogin = false;
  }

  limpaFormLogin() {
    this.senha = new FormControl(null, [Validators.required]);
  }

  onClickCadastrese() {
    this.visibleLogin = false;
  }

  async onCadastrese() {
    this.usuarioCadastro = {
      nome: this.formCadastrese.value.nome.value,
      email: this.formCadastrese.value.email.value,
      username: this.formCadastrese.value.username.value,
      password: this.formCadastrese.value.password.value,
      role: 'ADMIN',
    };

    if (
      this._validaCampo(this.usuarioCadastro.nome) &&
      this._validaCampo(this.usuarioCadastro.email) &&
      this._validaCampo(this.usuarioCadastro.username) &&
      this._validaCampo(this.usuarioCadastro.password)
    ) {
      this.load = true;
      this.btnCadastrese = true;

      await this.service.register(this.usuarioCadastro).then(
        (result) => {
          this._limpaFormCadastro();
          this.visibleLogin = true;
          this.onMessage('Usuário criado com sucesso');
        },
        (error) => this.retornoErro(error)
      );
      this.load = false;
      this.btnCadastrese = false;
    }
  }

  _validaCampo(param: String) {
    if (param != null && param.trim() != '') {
      return true;
    }
    return false;
  }

  _limpaFormCadastro() {
    this.form.value.login.value = this.usuarioCadastro.username;

    this.nome = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required]);
    this.username = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required]);
  }

  onClickEsqueciSenha() {
    const dialogRef = this.dialog.open(EsqueciSenhaDialogComponent, {
      data: {
        title: '',
      },
    });

    dialogRef.afterOpened().subscribe((result) => {});

    dialogRef.afterClosed().subscribe((result) => {
      this.onEsqueciSenha(result);
    });
  }

  async onEsqueciSenha(email: string) {
    this.load = true;

    if (email) {
      await this.service.esqueciSenha(email).then(
        (result) => {
          this.onMessage('Verifique seu email: ' + email);
        },
        (error) => this.retornoErro(error)
      );
    }
    this.load = false;
    this.btnLogin = false;
  }
  onVoltar() {
    this.visibleLogin = true;
  }

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 5000,
    });
  }
  onLogout() {
    this.serviceLS.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }

  retornoErro(error: any) {
    if (error?.error?.userMessage) {
      return this.onMessage(error?.error?.userMessage);
    }

    if (error?.status == 0) {
      this.retornoErroSemConexao();
    }
  }

  retornoErroSemConexao() {
    this.onMessage('Sem conexão com o servidor');
    this.load = false;
    this.onLogout();
  }
}
