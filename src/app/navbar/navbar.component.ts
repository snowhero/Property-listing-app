import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router, 
              public flashMessage: FlashMessagesService) 
    {
    this.user = afAuth.authState;
    }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.router.navigateByUrl('/home');
    this.navHome();
  }

  logout() {
    this.router.navigateByUrl('/home');
    this.navHome();
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logged out', 
    {cssClass: 'alert-success', timeout: 3000});
  }

  isLoggedIn() {
    if(firebase.auth().currentUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  navHome() { 
    this.router.navigateByUrl('/home');
  }
  
  ngOnInit() {
    this.navHome();
  }

}
