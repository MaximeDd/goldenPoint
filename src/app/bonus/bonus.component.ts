import {Component, Input, OnInit} from '@angular/core';
import {Bonus} from '../model/bonus';
import {EquipeService} from '../equipe.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  @Input() bonus: Bonus;

  constructor(private equipeService: EquipeService) {
  }

  ngOnInit(): void {
  }

  isAchetable(): boolean {
    return this.equipeService.equipeConnectee.nbGoldenPointsRestants >= this.bonus.cout;
  }

  acheter(): void {
    console.log('acheter');
    this.equipeService.acheterBonus(this.bonus);
  }
}
