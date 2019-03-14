import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { FirebaseService } from '../services/firebase.service';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private firebaseService: FirebaseService, private afAuth: AngularFireAuth) { 
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  ngOnInit() {
  }

}
