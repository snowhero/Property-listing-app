import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Listing } from '../interfaces/listing';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  listings: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase) { }
  
  getListings() {
    this.listings = this.db.list('/listings') as AngularFireList<Listing[]>;
    return this.listings;
  }
}
