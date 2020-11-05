import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Bonus} from './model/bonus';

@Injectable({
  providedIn: 'root'
})
export class BonusService {


  bonusList: Bonus[];

  bonusSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) {
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
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
