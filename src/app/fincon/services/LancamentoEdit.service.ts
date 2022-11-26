import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LancamentoEdit {
  private items: any[] = [];

  constructor() {}

  public getItems(): any[] {
    return this.items;
  }

  public setItems(items: any[]): void {
    if (this.items) {
      this.items = [];
      this.items = items;
    }
  }
}
