import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UnauthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
];
