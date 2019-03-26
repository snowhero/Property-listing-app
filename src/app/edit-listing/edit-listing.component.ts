import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

  id: any;
  title: any;
  owner: any;
  city: any;
  bedrooms: any;
  price: any;
  image: any;
  type: any;

  constructor(private firebaseService: FirebaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  onEditSubmit() {
    let listing = {
      title: this.title,
      owner: this.owner,
      city: this.city,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
    }
    console.log(listing);
    
    this.firebaseService.updateListing(this.id, listing);
    this.router.navigateByUrl('/listings');
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id).valueChanges().subscribe(listing => {
      this.title = listing.title;
      this.owner = listing.owner;
      this.city = listing.city;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
      this.type = listing.type;

      // if(this.image == undefined) {
      //   let storageRef = firebase.storage().ref();
      //   let spaceRef = storageRef.child(listing.path);
      //   spaceRef.getDownloadURL().then((url) => {
      //     this.image = url;
      //   }).catch((error) => {
      //     console.log(error);
      //   });
      // }
    });
  }

}
