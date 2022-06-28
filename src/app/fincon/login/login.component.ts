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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private serviceLS: LocalStorageService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      login: [this.login],
      senha: [this.senha],
    });
  }

  ngOnInit(): void {
    if (this.serviceLS.get('id') != null) {
      this.router.navigate(['principal'], { relativeTo: this.route });
    }
  }

  submit() {
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

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 5000,
    });
  }
}
