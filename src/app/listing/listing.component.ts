import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getListingDetails(this.id).valueChanges().subscribe(listing => {
      this.listing = listing;
      console.log(listing);
      
    })
  }

}
