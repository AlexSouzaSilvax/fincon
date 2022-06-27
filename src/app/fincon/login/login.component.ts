import { Usuario } from './../model/Usuario';
import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'fincon',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  actionMessage!: String;
  usuario!: Usuario;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private serviceLS: LocalStorageService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      login: [],
      senha: [],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.usuario = this.form.value;
    if (this.usuario) {
      this.service.access(this.usuario).subscribe(
        (result) => {
          if (result.id != null) {
            //gravar id no localstorage
            this.serviceLS.set('id', result.id);
            this.router.navigate(['principal'], { relativeTo: this.route });
          }
        },
        (error) => {
          if(error.error.message) {
            this.onMessage(error.error.message);
          } else {
            this.onMessage("Sem conexão com servidor");
          }
          
        }
      );
    }
  }

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 5000,
    });
  }
}
