import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-ofour',
  templateUrl: './four-ofour.component.html',
  styleUrls: ['./four-ofour.component.css']
})
export class FourOfourComponent implements OnInit {

  img = '/assets/images/404.png';

  constructor() { }

  ngOnInit(): void {
  }

}
