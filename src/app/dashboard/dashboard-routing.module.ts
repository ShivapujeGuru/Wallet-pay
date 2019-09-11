import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ServiceComponent } from './service/service.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MerchantGuard } from '../services/merchant.guard';
import { ItemsComponent } from './items/items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { MyitemsComponent } from './myitems/myitems.component';

const dashboardRoutes: Routes = [
    { path : '', component: DashboardComponent, children: [
        { path : '', component: ProfileComponent},
        { path : 'profile', component: ProfileComponent},
        { path : 'service', component: ServiceComponent},
        { path : 'users', component: UsersListComponent, canActivate: [MerchantGuard]},
        { path : 'items', component: ItemsComponent},
        { path : 'add-item', component: AddItemComponent},
        { path : 'my-items', component: MyitemsComponent},
        { path : 'history', component: HistoryComponent}
    ] }
];  

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ],
    exports: [RouterModule],
    providers: [
        MerchantGuard
    ]
})

export class DashboardRoutingModule {

}