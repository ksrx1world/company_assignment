import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './shared/auth-guard/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'register', component: RegistrationComponent},
  {path:'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, 
  {path: 'edituser/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
