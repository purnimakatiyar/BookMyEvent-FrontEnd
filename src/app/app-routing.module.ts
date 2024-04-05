import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: ()=> import('./home/home.module').then(
        (module)=> module.HomeModule)},
  {path: '', loadChildren: ()=> import('./auth/auth.module').then(
        (module)=>module.AuthModule)},
  {path: 'dashboard', loadChildren: ()=> import('./dashboard/dashboard.module').then(
        (module)=> module.DashboardModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
