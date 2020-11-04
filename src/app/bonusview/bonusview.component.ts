import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {EquipeService} from '../equipe.service';
import {BonusService} from '../bonus.service';
import {BonusComponent} from '../bonus/bonus.component';
import {Bonus} from '../model/bonus';

@Component({
  selector: 'app-bonusview',
  templateUrl: './bonusview.component.html',
  styleUrls: ['./bonusview.component.css']
})
export class BonusviewComponent implements OnInit, OnDestroy {

  bonusSub: Subscription;
  bonusList: Bonus[];

  constructor(private bonusService: BonusService) {
  }

  ngOnDestroy(): void {
    this.bonusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.bonusSub = this.bonusService.bonusSubject.subscribe(
      (bonusList: Bonus[]) => {
        bonusList.forEach(bonus => bonus.achetable = true);
        this.bonusList = bonusList;
      });
    this.bonusService.emitBonusListSubject();
  }

}
