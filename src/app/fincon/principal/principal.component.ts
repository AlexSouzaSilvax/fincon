import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { MatIconRegistry } from '@angular/material/icon';
//import { DomSanitizer } from '@angular/platform-browser';

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

  constructor() {
    /*iconRegistry.addSvgIconLiteral(
      'entradas',
      sanitizer.bypassSecurityTrustResourceUrl(
        `../../../assets/icons/entradas.svg`
      )
    );*/
  }

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
