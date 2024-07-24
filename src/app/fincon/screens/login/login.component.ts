import { Usuario } from './../../model/Usuario';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsuarioAccessDTO } from '../../model/UsuarioAccessDTO';
import { MatDialog } from '@angular/material/dialog';
import { EsqueciSenhaDialogComponent } from 'src/app/shared/components/esqueci-senha-dialog/esqueci-senha-dialog.component';

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
      login: [],
      senha: [],
    });
  }

  ngOnInit(): void {
    if (this.serviceLS.get('id') != null) {
      this.router.navigate(['principal'], { relativeTo: this.route });
    }
  }

  onLogin() {
    this.usuarioAccess = {
      username: this.form.value.login.value,
      password: this.form.value.senha.value,
      token: '',
      id: ''
    };
    if (
      this.usuarioAccess.username != null &&
      this.usuarioAccess.password != null
    ) {
      //load true
      this.load = true;
      //btn login off
      this.btnLogin = true;
      if (this.usuarioAccess) {
        this.service.access(this.usuarioAccess).then(
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
  }

  onClickCadastrese() {
    this.visibleLogin = false;
  }

  onCadastrese() {
    //load true
    this.load = true;
    //btn login off
    this.btnCadastrese = true;

    if (this.formCadastrese) {
      this.service.save(this.formCadastrese.value).then(
        (result) => {
          this.onMessage('Usuário criado com sucesso');
        },
        (error) => this.retornoErro(error)
      );
    }
    this.load = false;
    this.btnCadastrese = false;
  }

  onClickEsqueciSenha() {
    const dialogRef = this.dialog.open(EsqueciSenhaDialogComponent, {
      data: {
        title: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onEsqueciSenha(result);
    });
  }

  onEsqueciSenha(email: string) {
    this.onMessage('Senha enviada para: ' + email);
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
    {
      if (error.status == 500) {
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
    }
  }
  retornoErroSemConexao() {
    this.onMessage('Sem conexão com o servidor');
    this.load = false;
    this.btnLogin = false;
    this.onLogout();
  }
}
