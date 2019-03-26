import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

import { FirebaseService } from '../services/firebase.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id: any;
  listing: any;
  imageUrl: any;

  constructor(private firebaseService: FirebaseService, 
              private router: Router, 
              private route: ActivatedRoute,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];    
    this.firebaseService.getListingDetails(this.id).snapshotChanges().pipe( map(actions => {
      return ({ key: actions.key, ...actions.payload.val() });
    })).subscribe( listing => {
      this.listing = listing;
      console.log(listing);
      
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      spaceRef.getDownloadURL().then((url) => {
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
  }

}
