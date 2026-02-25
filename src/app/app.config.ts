import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authRoutes } from './features/auth/auth.routes';
import { adminRoutes } from './features/admin/admin.routes';
import { userRoutes } from './features/user/user.routes';
import { Home } from './features/home/home';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '',      component: Home           },
      { path: 'auth',  children:  authRoutes     },
      { path: 'admin', children:  adminRoutes    },
      { path: 'user',  children:  userRoutes     },
      { path: '**',    redirectTo: ''            }
    ])
  ]
};