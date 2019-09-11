import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path : '', loadChildren: './public/public.module#PublicModule'},
  // { path : 'public', loadChildren: './public/public.module#PublicModule'},
  { path : 'dashboard-layout', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule { }