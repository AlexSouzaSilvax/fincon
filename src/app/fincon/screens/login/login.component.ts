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
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from './../../model/Usuario';

@Component({
  selector: 'fincon',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  actionMessage!: String;
  usuario!: Usuario;
  load: boolean = false;
  btnLogin: boolean = false;
  btnCadastrese: boolean = false;
  login = new FormControl(null, [Validators.required]);
  senha = new FormControl(null, [Validators.required]);
  usuarioAccess!: UsuarioAccessDTO;
  formCadastrese: FormGroup;
  visibleLogin: boolean = true;

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
      nome: [],
      email: [],
      username: [],
      password: [],
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
      this.usuarioAccess.username != null &&
      this.usuarioAccess.password != null
    ) {
      this.load = true;
      this.btnLogin = true;
      if (this.usuarioAccess) {
        await this.service.access(this.usuarioAccess).then(
          (result?) => {
            if (result?.token) {
              this.serviceLS.set('token', result?.token);
              this.serviceLS.set('id', result?.id);
              this.router.navigate(['principal'], { relativeTo: this.route });
            }
          },
          (error) => this.retornoErro(error)
        );
      }
    }
    this.load = false;
    this.btnLogin = false;
  }

  onClickCadastrese() {
    this.visibleLogin = false;
  }

  async onCadastrese() {
    this.load = true;
    this.btnCadastrese = true;

    if (this.formCadastrese) {
      await this.service.register(this.formCadastrese.value).then(
        (result) => {
          this.onMessage('Usuário criado com sucesso');
        },
        (error) => this.retornoErro(error)
      );
    }
    this.load = false;
    this.btnCadastrese = false;
    this.visibleLogin = true;
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
    console.log();
    /*
    error.error:
        detail: "Usuário inexistente ou senha inválida"
        status: 403
        timestamp: "2024-08-16T20:44:29.5122279-03:00"
        title: "Acesso negado"
        type: "https://www.fincon.com.br/acesso-negado"
        userMessage: "Você não possui permissão para executar essa operação."
    */

    return this.onMessage(error?.error?.userMessage);


    /*if (error.status == 500) {
      this.onMessage(`#${error.status} Falha no sistema`);
    }
    if (error.name) {
        if (error.name == 'TimeoutError') {
          this.retornoErroSemConexao();
        }
      }

      if (error.error.message) {
        this.onMessage(error.error.message);
        this.load = false;
        this.btnLogin = false;
      } else {
        this.retornoErroSemConexao();
      }
      */

    //limpar formulario
  }
  retornoErroSemConexao() {
    this.onMessage('Sem conexão com o servidor');
    this.load = false;
    this.btnLogin = false;
    this.onLogout();
  }
}
