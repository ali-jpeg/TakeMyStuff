import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PostListingComponent } from './features/post-listing/post-listing.component';
import { DiscoverListingsComponent } from './features/discover-listings/discover-listings.component';
import { MessagesComponent } from './features/messages/messages.component';
import { NavigationComponent } from './features/navigation/navigation.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'postlisting', component:PostListingComponent},
    {path:'discoverlisting', component:DiscoverListingsComponent},
    {path:'messages', component:MessagesComponent},
    {path:'navigation', component:NavigationComponent},
 
];

