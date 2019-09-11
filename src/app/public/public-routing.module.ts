import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';

const publicRoutes: Routes = [
    { path : '', component: PublicComponent, children: [
        { path : '', component: HomeComponent},
        { path : 'home', component: HomeComponent},
        { path : 'login', component: LoginComponent},
        { path : 'registration', component: RegistrationComponent}
    ] } 
];  

@NgModule({
    imports: [
        RouterModule.forChild(publicRoutes)
    ],
    exports: [RouterModule],
    providers: []
})

export class PublicRoutingModule {

}