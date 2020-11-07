export class Bonus {
  constructor(public id: number,
              public type: string,
              public description: string,
              public cout: number,
              public dateUtilisation: Date,
              public dateAchat: Date,
              public achetable: boolean,
              public promo: boolean,
              public nouveau: boolean,
              public quantite: number) {
  }
}
