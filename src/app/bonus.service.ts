import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BonusService {


  bonusList = [];

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
          this.emitBonusListSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
}
