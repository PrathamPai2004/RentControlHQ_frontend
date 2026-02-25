import { Routes } from '@angular/router';
import { UserShell } from './user-shell/user-shell';
import { BrowseTowers } from './browse-towers/browse-towers';
import { BrowseUnits } from './browse-units/browse-units';
import { MyBookings } from './my-bookings/my-bookings';
import { MyLease } from './my-lease/my-lease';

export const userRoutes: Routes = [
  {
    path: '',
    component: UserShell,
    children: [
      { path: 'towers',      component: BrowseTowers },
      { path: 'units',       component: BrowseUnits },
      { path: 'my-bookings', component: MyBookings },
      { path: 'my-lease',    component: MyLease },
      { path: '', redirectTo: 'towers', pathMatch: 'full' }
    ]
  }
];
