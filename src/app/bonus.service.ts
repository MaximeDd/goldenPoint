import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BonusService {


  bonusList: { id: number, type: string, description, cout: number }[] =
    [
      {id: 1, type: 'On l’appellera Jean-Eude', description: 'Impose un pseudo à un autre joueur pour toute la soirée', cout: 2},
      {id: 1, type: 'Antisèche', description: 'Tu peux connaitre les thèmes des quizz la veille', cout: 3},
      {id: 1, type: 'Spécialiste', description: 'Choisisun thème de prédilection pour la semaine suivante', cout: 2},
      {id: 1, type: 'Robin des bois', description: 'Vole 4 points à quelqu’un de mieux classé que toi en cours departie', cout: 3},
      {id: 1, type: 'Mégalo', description: 'Tu peux avoir un quizz sur ta personne la semaine suivante', cout: 5},
      {id: 1, type: 'BlackOut', description: 'Annule les scores du dernier quizz', cout: 4},
      {
        id: 1,
        type: 'Golden boy',
        description: 'Pour la prochaine soirée, chaque place sur le podium à un quizz te rapportera 1 GP',
        cout: 2
      },
    ];

  bonusSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) {
    this.saveAllBonus();
    this.getAllBonus();
  }

  emitBonusListSubject() {
    this.bonusSubject.next(this.bonusList.slice());
  }

  getAllBonus(): void {
    this.httpClient
      .get<any[]>('https://goldenpoint-quiz.firebaseio.com/bonus.json')
      .subscribe(
        (response) => {
          this.bonusList = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveAllBonus(): void {
    this.httpClient
      .put('https://goldenpoint-quiz.firebaseio.com/bonus.json', this.bonusList)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
