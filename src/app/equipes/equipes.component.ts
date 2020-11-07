import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EquipeService} from '../equipe.service';
import {Equipe} from '../model/equipe';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit, OnDestroy {
  equipesSub: Subscription;
  equipes: Equipe[];

  constructor(private equipeservice: EquipeService) {
  }

  ngOnDestroy(): void {
    this.equipesSub.unsubscribe();
  }

  ngOnInit(): void {
    this.equipesSub = this.equipeservice.equipesSubject.subscribe(
      (equipes: Equipe[]) => {
        equipes = this.equipeservice.sortAndGetClassement(equipes);
        equipes.forEach(equipe => {
          if (equipe.bonusList !== null && equipe.bonusList !== undefined) {
            equipe.bonusList.sort((a, b) => (a.dateAchat > b.dateAchat) ? -1 : 1);
          }
        });
        this.equipes = equipes;
      });
    this.equipeservice.emitEquipesSubject();
  }
}
