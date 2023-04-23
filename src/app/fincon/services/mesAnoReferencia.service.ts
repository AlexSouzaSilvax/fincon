import { Injectable } from '@angular/core';
import { getMesAnoAtual } from 'src/app/shared/Util';

@Injectable({
  providedIn: 'root',
})
export class MesAnoReferenciaService {
  private mes: number = 0;
  private ano: number = 0;

  constructor() {}

  public getMesAnoAtual(): { mes: number; ano: number } {
    if (this.mes == 0) {
      const { mes, ano } = getMesAnoAtual();
      this.mes = mes;
      this.ano = ano;
      //console.log('Service, pegou atual.');
    }
    //console.log('Service, pegou service.');
    return { mes: this.mes, ano: this.ano };
  }

  public getMes(): number {
    return this.mes;
  }

  public getAno(): number {
    return this.ano;
  }

  public setMes(mes: number): void {
    this.mes = mes;
  }

  public setAno(ano: number): void {
    this.ano = ano;
  }
}
