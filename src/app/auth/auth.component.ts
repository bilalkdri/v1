import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @Input() authStatus: any ;
  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit() {
    
    this.authStatus = this.authService.isAuth;
    
    
  }

  onSignIn() {
    this.authService.signIn();
    if(this.authService.isAuth==true){//test via SignIn si les identifiants sont bons
        this.authStatus = this.authService.isAuth;
      
        this.router.navigate(['creationApprenant']);//renvoie sur l'application creationApprenant
    }
    else{
      (<HTMLSpanElement>document.getElementById("error")).innerHTML = "erreur: identifiant et/ou mot de passe";//prévient d'une erreur si SignIn ne renvoie pas true
    }
      
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
    this.router.navigate(['auth']);
  }

}



