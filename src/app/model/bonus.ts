export class Bonus {
  constructor(public id: number,
              public type: string,
              public description: string,
              public cout: number,
              public utilise: boolean,
              public dateUtilisation: Date,
              public dateAchat: Date,
              public achetable: boolean) {
  }
}
