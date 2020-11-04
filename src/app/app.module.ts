import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EquipeComponent} from './equipe/equipe.component';
import {BonusComponent} from './bonus/bonus.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EquipeService} from './equipe.service';
import {HttpClientModule} from '@angular/common/http';
import {EquipesComponent} from './equipes/equipes.component';
import {AuthComponent} from './auth/auth.component';
import {BonusviewComponent} from './bonusview/bonusview.component';
import {RouterModule, Routes} from '@angular/router';
import {BonusService} from './bonus.service';
import {AuthGuardService} from './auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {path: 'equipes', canActivate: [AuthGuardService], component: EquipesComponent},
  {path: 'bonus', canActivate: [AuthGuardService], component: BonusviewComponent},
  { path: 'auth', component: AuthComponent },
  {path: '', canActivate: [AuthGuardService], component: EquipesComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    EquipeComponent,
    BonusComponent,
    EquipesComponent,
    AuthComponent,
    BonusviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [
    EquipeService,
    BonusService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
