import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fincon';

  constructor() {
    //console.warn(`🚨 Console output is disabled on production!`);
    //console.log = function (): void {};
    //console.debug = function (): void {};
    console.warn = function (): void {};
    //console.info = function (): void {};
  }
}