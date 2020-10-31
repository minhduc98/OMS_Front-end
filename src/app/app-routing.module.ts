import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  // { path: 'contribute', component: ContributionComponent, children: [
  //   { path: '', redirectTo: '/contribute/record', pathMatch: 'full'},
  //   { path: 'record', component: RecordComponent},
  //   { path: 'listen', component: ListenComponent}
  // ]},
  // { path: 'about', component: AboutComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
