import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Listing } from '../interfaces/listing';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  listings: AngularFireList<any[]>;
  listing: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }
  
  getListingDetails(id: any) {
    this.listing = this.db.object('/listings/'+id) as AngularFireObject<Listing>;
    return this.listing;
  }
  getListings() {
    this.listings = this.db.list('/listings') as AngularFireList<Listing[]>;
    return this.listings;
  }
}
