import { Routes } from '@angular/router';
import { Characterlist } from './characterlist/characterlist';
import { Characterdetails } from './characterdetails/characterdetails';
import { Characterfilter } from './characterfilter/characterfilter';

export const routes: Routes = [
  { path: '', component: Characterlist },
  { path: 'filter', component: Characterfilter },
  { path: 'character/:id', component: Characterdetails }
];