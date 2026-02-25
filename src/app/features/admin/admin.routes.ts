import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Towers } from './towers/towers';
import { Bookings } from './bookings/bookings';
import { Leases } from './leases/leases';
import { Units } from './units/units';
import { AdminUsers } from './admin-users/admin-users';

export const adminRoutes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: 'towers',    component: Towers    },
      { path: 'units',     component: Units     },
      { path: 'bookings',  component: Bookings  },
      { path: 'leases',    component: Leases    },
      { path: 'users',     component: AdminUsers },
      { path: 'dashboard', component: Towers    },
      { path: '', redirectTo: 'towers', pathMatch: 'full' }
    ]
  }
];
