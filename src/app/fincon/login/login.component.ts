import { Usuario } from './../model/Usuario';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UsuarioAccessDTO } from '../model/UsuarioAccessDTO';
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
  login = new FormControl('', [Validators.required]);
  senha = new FormControl('', [Validators.required]);
  usuarioAccess!: UsuarioAccessDTO;
  formEsqueciSenha: FormGroup;

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
    this.formEsqueciSenha = this.formBuilder.group({
      email: [],
    });
  }

  ngOnInit(): void {
    if (this.serviceLS.get('id') != null) {
      this.router.navigate(['principal'], { relativeTo: this.route });
    }
  }

  onLogin() {
    this.usuarioAccess = {
      login: this.form.value.login.value,
      senha: this.form.value.senha.value,
    };

    if (this.usuarioAccess.login != null && this.usuarioAccess.senha != null) {
      //load true
      this.load = true;
      //btn login off
      this.btnLogin = true;

      if (this.usuarioAccess) {
        this.service.access(this.usuarioAccess).subscribe(
          (result) => {
            if (result.id != null) {
              this.serviceLS.set('id', result.id);
              this.router.navigate(['principal'], { relativeTo: this.route });
            }
          },
          (error) => {
            if (error.error.message) {
              this.onMessage(error.error.message);
            } else {
              this.onMessage('Sem conexão com servidor');
            }
          }
        );
      }
      this.load = false;
      this.btnLogin = false;
    }
  }

  onCadastrese() {
    this.onMessage('Em construção');
  }

  onClickEsqueciSenha() {
    const dialogRef = this.dialog.open(EsqueciSenhaDialogComponent, {
      data: {
        title: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.onEsqueciSenha(result);
    });
  }

  onEsqueciSenha(email: string) {
    this.onMessage('Senha enviada para: ' + email);
  }

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 5000,
    });
  }
}
