import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  listings: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getListings().snapshotChanges().pipe( map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    })).subscribe( listings => {
      this.listings = listings;
      console.log(this.listings);
    })
  }

}
