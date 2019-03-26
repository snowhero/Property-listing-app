import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Listing } from '../interfaces/listing';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  listings: AngularFireList<Listing[]>;
  listing: AngularFireObject<Listing>;
  folder: any;

  constructor(private db: AngularFireDatabase) { 
    this.folder = 'listingimages';
    this.listings = this.db.list('/listings') as AngularFireList<Listing[]>;
  }
  
  deleteListing(id: any) {
    return this.listings.remove(id);
  }

  updateListing(id: any, listing: any) {
    return this.listings.update(id, listing);
  }

  getListingDetails(id: any) {
    this.listing = this.db.object('/listings/'+id) as AngularFireObject<Listing>;
    return this.listing;
  }

  getListings() {
    return this.listings;
  }

  addListing(listing: any) {
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      let path = `/${this.folder}/${selectedFile.name}`;
      console.log(path);
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }
}
