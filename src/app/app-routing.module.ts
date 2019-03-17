import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingComponent } from './listing/listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

const routes = [
  { path: '' , component: HomeComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'listing/:id', component: ListingComponent },
  { path: 'add-listing', component: AddListingComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'edit-listing', component: EditListingComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
