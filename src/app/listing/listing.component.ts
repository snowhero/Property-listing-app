import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { FirebaseService } from '../services/firebase.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  id: any;
  listing: any;
  imageUrl: any;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(private firebaseService: FirebaseService, 
              private router: Router, 
              private route: ActivatedRoute,
              private db: AngularFireDatabase) { 
                db.list(`/listings`).snapshotChanges().pipe( map(actions => {
                  return actions.map(action => {
                      const $key = action.payload.key;
                      const data = { $key, ...action.payload.val() };
                      return data;
                  });
              })).subscribe(items => console.log(items));
              }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];    
    this.firebaseService.getListingDetails(this.id).valueChanges().subscribe(listing => {
      console.log(listing);
      this.listing = listing;
    })
  }

}
