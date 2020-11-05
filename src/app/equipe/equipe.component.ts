import {Component, Input, OnInit} from '@angular/core';
import {Equipe} from '../model/equipe';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {

  @Input() equipe: Equipe;
  goldMedal = '/assets/images/goldMedal.png';
  silverMedal = '/assets/images/silverMedal.png';;
  bronzeMedal = '/assets/images/bronzeMedal.png';;

  constructor() {
  }

  ngOnInit(): void {
  }

}
