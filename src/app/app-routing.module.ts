import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layOuts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthLayoutComponent } from './layOuts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    component: BlankLayoutComponent,
    children: [
      {path:'',redirectTo:'home',pathMatch:'full'},
      { path: 'home', component: HomeComponent, title: 'home' }],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
        title: 'login',
      },
      { path: 'register', component: RegisterComponent, title: 'register' },
    ],
  },
  {path:'**',component:NotFoundComponent,title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
