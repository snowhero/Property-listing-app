import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

  title: any;
  owner: any;
  city: any;
  bedrooms: any;
  price: any;
  type: any;
  image: any;

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  onAddSubmit() {
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type,
      image: this.image
    }    
    console.log(listing);
    if(listing.title == undefined) { alert('Please add a title'); return; };
    if(listing.city == undefined) { alert('Please add a city'); return; };
    if(listing.owner == undefined) { alert('Please add a owner'); return; };
    if(listing.bedrooms == undefined) { alert('Please add a bedroom'); return; };
    if(listing.type == undefined) { alert('Please add a type'); return; };
    if(listing.image == undefined) { alert('Please attach an image'); return; };
    if(listing.price == undefined) { alert('Please add a price'); return; };
    
    this.firebaseService.addListing(listing);
    this.router.navigate(['/listings']);
  }

  ngOnInit() {
  }

}
