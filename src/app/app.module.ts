import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ExportAsModule } from 'ngx-export-as';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RegistrationComponent } from './public/registration/registration.component';
import { HomeComponent } from './public/home/home.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { DataService } from './services/data';
import { HttpClientModule } from '@angular/common/http';
import { AddBankComponent } from './dashboard/add-bank/add-bank.component';
import { CheckBalanceComponent } from './dashboard/check-balance/check-balance.component';
import { TransferComponent } from './dashboard/transfer/transfer.component';
import { AddWalletMoneyComponent } from './dashboard/add-wallet-money/add-wallet-money.component';
import { ServiceComponent } from './dashboard/service/service.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicComponent } from './public/public.component';
import { PublicNavbarComponent } from './public/public-navbar/public-navbar.component';
import { PrivateNavbarComponent } from './dashboard/private-navbar/private-navbar.component';
import { UsersListComponent } from './dashboard/users-list/users-list.component';
import { ModalComponent } from './shared/modal/modal.component';
import { AddItemComponent } from './dashboard/add-item/add-item.component';
import { ItemsComponent } from './dashboard/items/items.component';
import { MyitemsComponent } from './dashboard/myitems/myitems.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HistoryComponent,
    AddBankComponent,
    CheckBalanceComponent,
    TransferComponent,
    AddWalletMoneyComponent,
    ServiceComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    PublicComponent,
    PublicNavbarComponent,
    PrivateNavbarComponent,
    UsersListComponent,
    ModalComponent,
    AddItemComponent,
    ItemsComponent,
    MyitemsComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    ExportAsModule,
    SelectDropDownModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
