import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Equipe} from './model/equipe';
import {Bonus} from './model/bonus';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {


  // equipes: { id: number, nom: string, nbGoldenPointsGagnes: number, nbGoldenPointsRestants: number, bonusList: { bonus: BonusComponent, quantite: number }[] }[] =
  //   [{id: 1, nom: 'Alex et Max', nbGoldenPointsGagnes: 1, nbGoldenPointsRestants: 1, bonusList: []},
  //     {id: 2, nom: 'Mathilde', nbGoldenPointsGagnes: 2, nbGoldenPointsRestants: 2, bonusList: []},
  //     {id: 3, nom: 'Jeanne et Serge', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []},
  //     {id: 4, nom: 'Claire et Greg', nbGoldenPointsGagnes: 5, nbGoldenPointsRestants: 5, bonusList: []},
  //     {id: 5, nom: 'Lucie et Correntin', nbGoldenPointsGagnes: 1, nbGoldenPointsRestants: 1, bonusList: []},
  //     {id: 6, nom: 'Céline', nbGoldenPointsGagnes: 1, nbGoldenPointsRestants: 1, bonusList: []},
  //     {id: 7, nom: 'Sophie', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []},
  //     {id: 8, nom: 'Marge et Pierre', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []},
  //     {id: 9, nom: 'Charlotte et Monk', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []},
  //     {id: 10, nom: 'Lise', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []},
  //     {id: 11, nom: 'Amy et Arnold', nbGoldenPointsGagnes: 0, nbGoldenPointsRestants: 0, bonusList: []}];

  private equipes: Equipe[];

  equipesSubject = new Subject<any[]>();

  equipeConnectee: Equipe;
  equipeConnecteeSubject = new Subject<Equipe>();

  constructor(private httpClient: HttpClient) {
    this.getAllEquipes();
  }

  emitEquipesSubject() {
    this.equipesSubject.next(this.equipes.slice());
  }

  emitequipeConnecteeSubject() {
    this.equipeConnecteeSubject.next(this.equipeConnectee);
  }

  getAllEquipes(): void {
    this.httpClient
      .get<any[]>('https://goldenpoint-quiz.firebaseio.com/equipes.json')
      .subscribe(
        (response) => {
          this.equipes = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  getEquipeByPassword(password: string): Equipe {
    let equipeByPassword: Equipe;
    this.equipes.forEach(function(equipe) {
      if (equipe.password === password) {
        equipeByPassword = equipe;
      }
    });
    return equipeByPassword;
  }

  saveAllEquipes(): void {
    this.httpClient
      .put('https://goldenpoint-quiz.firebaseio.com/equipes.json', this.equipes)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveEquipe(equipe: Equipe): void {
    const url = 'https://goldenpoint-quiz.firebaseio.com/equipes/' + equipe.id + '.json';
    console.log(url);
    this.httpClient
      .put(url, equipe)
      .subscribe(
        () => {
          console.log('Màj equipe OK !' + equipe);
          this.equipeConnectee = equipe;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  acheterBonus(bonus: Bonus): void {
    bonus.utilise = false;
    bonus.dateAchat = new Date();
    const equipeConnectee = this.equipeConnectee;
    if (!equipeConnectee.bonusList) {
      equipeConnectee.bonusList = [];
    }
    equipeConnectee.bonusList.push(bonus);
    equipeConnectee.nbGoldenPointsRestants = equipeConnectee.nbGoldenPointsRestants - bonus.cout;
    this.saveEquipe(equipeConnectee);
  }

  isAuth(): boolean {
    return this.equipeConnectee !== undefined && this.equipeConnectee !== null;
  }

  signIn(password: string): void {
    this.equipeConnectee = this.getEquipeByPassword(password);
  }
}
