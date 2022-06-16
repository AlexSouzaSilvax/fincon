import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Lancamento } from '../model/LancamentoListaDTO';

const ELEMENT_DATA: Lancamento[] = [
  {
    descricao: 'Capinha iPhone',
    valor: 10.0,
    tipo_pagamento: 'Crédito',
    data_lancamento: '10/06/2022',
    tipo_lancamento: 'Saída',
  },
  {
    descricao: 'Pelicula iPhone',
    valor: 25.0,
    tipo_pagamento: 'Crédito',
    data_lancamento: '10/06/2022',
    tipo_lancamento: 'Saída',
  },
  {
    descricao: 'Ferias 1/320',
    valor: 18.99,
    tipo_pagamento: 'Crédito',
    data_lancamento: '10/05/2022',
    tipo_lancamento: 'Saída',
  }
];

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  displayedColumns: string[] = [
    'descricao',
    'valor',
    'tipo_pagamento',
    'data_lancamento',
    'actions'
  ];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  onAdd() {
    
  }

  onEdit(pLancamento: Lancamento) {
    
  }

  onClickDelete(_id: string) {
    
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
