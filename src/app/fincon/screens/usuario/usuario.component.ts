import { Component, OnInit } from '@angular/core';
import {
  changeData,
  findTipo,
  formatDataInput,
  listaCategorias,
  listaParcelas,
  listaTipoLancamentos,
  listaTipoPagamentos,
  _formatData,
  delay,
  _formatData2,
} from 'src/app/shared/Util';
import { ModelComboBox } from '../../model/ModelComboBox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LancamentoService } from '../../services/lancamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lancamento } from '../../model/Lancamento';
import { LocalStorageService } from '../../services/local-storage.service';
import { LancamentoEdit } from '../../services/LancamentoEdit.service';
import { Usuario } from '../../model/Usuario';
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
    private snackbar: MatSnackBar,
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
      login: [this.usuario.login, [Validators.required]],
      senha: [this.usuario.senha, [Validators.required]],
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
            login: [result.login, [Validators.required]],
            senha: [result.senha, [Validators.required]],
            data_criacao: [formatDataInput(result.data_criacao)],
          });
          this.loadFind = false;
        }
      },
      (error) => {
        this.onMessage('Sem conexão com o servidor');
        this.loadFind = false;
        this.onLogout();
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
      await this.service.save(this.usuario).then(
        async (result) => {
          if (result) {
            this.onMessage(`Salvo com sucesso`);
          }
        },
        (error) => {
          this.onMessage(`Sem conexão com o servidor`);
          this.onLogout();
        }
      );

      this.load = false; // inativa load
      this.disabledSalvar = false; // ativa botao salvar
    } else {
      this.onMessage('Preencha todos os campos obrigatórios');
    }
  }

  private onMessage(actionMessage: String) {
    this.snackbar.open(`${actionMessage}`, '', {
      duration: 1000,
    });
  }

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
    const { email, login, senha } = this.form.value;
    if (
      email != null &&
      login != null &&
      senha != null &&
      email != '' &&
      login != '' &&
      senha != ''
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
