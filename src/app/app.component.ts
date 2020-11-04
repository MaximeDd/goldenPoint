import {Component} from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'goldenPoint';
  isCollapse: boolean;

  constructor() {
    this.isCollapse = true;

    const firebaseConfig = {
      apiKey: 'AIzaSyAKROJtmZkLtf5bEQumxEarKx9rz2aQk-I',
      authDomain: 'goldenpoint-quiz.firebaseapp.com',
      databaseURL: 'https://goldenpoint-quiz.firebaseio.com',
      projectId: 'goldenpoint-quiz',
      storageBucket: 'goldenpoint-quiz.appspot.com',
      messagingSenderId: '480518087265',
      appId: '1:480518087265:web:8c759eb2422bf5e3e44020'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

  }

}
