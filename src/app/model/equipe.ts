import {Input} from '@angular/core';
import {Bonus} from './bonus';

export class Equipe {
  constructor(public id: number,
              public nom: string,
              public nbGoldenPointsGagnes: number,
              public nbGoldenPointsRestants: number,
              public score: number,
              public classement: number,
              public password: string,
              public bonusList: Bonus[],
              public looser: boolean) {
  }
}
