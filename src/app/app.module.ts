import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {HttpClientModule} from "@angular/common/http";
import { AuthComponent } from './auth/auth.component';
import { AppareilViewComponent } from './appareil-view/appareil-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
const appRoutes: Routes = [
  { path: 'creationApprenant', canActivate:[AuthGuard], component: AppareilViewComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', component: AuthComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    AuthComponent,
    AppareilViewComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  AuthService,
  AuthGuard
],
  bootstrap: [AppComponent]
})
export class AppModule { }
