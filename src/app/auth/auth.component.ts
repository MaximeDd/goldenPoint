import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Equipe} from '../model/equipe';
import {EquipeService} from '../equipe.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  identificationStatus: boolean;
  equipeConnectee: Equipe;
  equipeConnecteeSub: Subscription;
  passwordForm: FormGroup;


  constructor(private equipeService: EquipeService, private formBuilder: FormBuilder, private router: Router) {
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ''
    });
  }

  onSubmitForm() {
    const formValue = this.passwordForm.value;
    this.onSignIn(formValue['password']);
    this.router.navigate(['/equipes']);
  }

  ngOnInit(): void {
    this.initForm();
    this.equipeConnecteeSub = this.equipeService.equipeConnecteeSubject.subscribe(
      (equipeConnectee: Equipe) => this.equipeConnectee = equipeConnectee);
    this.equipeService.emitequipeConnecteeSubject();
    this.identificationStatus = this.equipeService.isAuth();
  }

  ngOnDestroy(): void {
    this.equipeConnecteeSub.unsubscribe();
  }


  onSignIn(password: string): void {
    this.equipeService.signIn(password);
  }
}
