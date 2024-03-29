import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LandingComponent } from './landing/landing.component';
import { AuthenticationGuard } from './authentication.guard';
import { DepartmentsComponent } from './landing/departments/departments.component';
import { SubscriptionComponent } from './landing/subscription/subscription.component';
import { UserComponent } from './landing/user/user.component';
import { StageComponent } from './landing/stage/stage.component';
import { HelpComponent } from './landing/help/help.component';
import { AdministrationComponent } from './landing/administration/administration.component';
import { AuthenticationComponent } from './landing/authentication/authentication.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'logout', component: LogoutComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'landing', component: LandingComponent},
   { path: 'store', component: StageComponent, canActivate: [AuthenticationGuard]},
   { path: 'subscriptions', component: SubscriptionComponent, canActivate: [AuthenticationGuard]},
   { path: 'membership', component: AdministrationComponent, canActivate: [AuthenticationGuard]},
   { path: 'groups', component: AuthenticationComponent, canActivate: [AuthenticationGuard]},
   { path: 'help', component: HelpComponent, canActivate: [AuthenticationGuard]},
   { path: 'user', component: UserComponent, canActivate: [AuthenticationGuard]},
   { path: 'departments', component: DepartmentsComponent},
   { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }