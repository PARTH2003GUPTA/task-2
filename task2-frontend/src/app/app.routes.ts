import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: '', redirectTo:"login",pathMatch:'full',title:"Login Page"},
    { path: 'login', component: LoginComponent },
    {path:'home',component:HomeComponent ,title:"Home Page"},
    {path:"**",component:PagenotfoundComponent,title:"Page not Found"}

];
