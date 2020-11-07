import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Equipe} from './model/equipe';
import {Bonus} from './model/bonus';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  equipes = [];

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
    const url = 'https://goldenpoint-quiz.firebaseio.com/' + environment.equipesDB + '.json';
    this.httpClient
      .get<any[]>(url)
      .subscribe(
        (response) => {
          this.equipes = response;
          this.emitEquipesSubject();

          if (this.equipeConnectee !== undefined && this.equipeConnectee !== null) {
            this.equipeConnectee = this.getEquipeByPassword(this.equipeConnectee.password);
            sessionStorage.setItem('equipe', JSON.stringify(this.equipeConnectee));
          }
          this.emitequipeConnecteeSubject();
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
    const url = 'https://goldenpoint-quiz.firebaseio.com/' + environment.equipesDB + '.json';
    this.httpClient
      .put(url, this.equipes)
      .subscribe(
        () => {
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  saveEquipe(equipe: Equipe): void {
    sessionStorage.setItem('equipe', JSON.stringify(equipe));
    const url = 'https://goldenpoint-quiz.firebaseio.com/' + environment.equipesDB + '/' + equipe.id + '.json';
    this.httpClient
      .put(url, equipe)
      .subscribe(
        () => {
          this.equipeConnectee = equipe;
          this.getAllEquipes();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  acheterBonus(bonus: Bonus): void {
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
    if (this.equipeConnectee === undefined || this.equipeConnectee === null) {
      const equipeSession = sessionStorage.getItem('equipe');
      if (equipeSession !== undefined && equipeSession !== null && equipeSession !== '') {
        this.equipeConnectee = JSON.parse(equipeSession);
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  signIn(password: string): void {
    this.equipeConnectee = this.getEquipeByPassword(password);
    if (this.equipeConnectee !== undefined && this.equipeConnectee !== null) {
      sessionStorage.setItem('equipe', JSON.stringify(this.equipeConnectee));
    }
  }

  sortAndGetClassement(equipes: Equipe[]): Equipe[] {
    equipes.sort((a, b) => (a.nbGoldenPointsRestants > b.nbGoldenPointsRestants) ? 1 : -1)
      .sort((a, b) => (a.nbGoldenPointsGagnes > b.nbGoldenPointsGagnes) ? 1 : -1)
      .sort((a, b) => (a.score > b.score) ? -1 : 1);
    let i = 1;
    equipes.forEach(equipe => {
      equipe.classement = i;
      i++;
    });
    return equipes;
  }
}
