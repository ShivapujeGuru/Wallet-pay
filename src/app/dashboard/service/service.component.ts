import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  data = [];
  walletMoney = false;
  add = false;
  check = false;
  transfer = false;
  transferToBank = false;
  phoneNumber : number;
  isMerchant = false;
  bank = true;
  walletBalance : number;

  constructor(private router: Router,
              private dataService: DataService,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getDetails();
    this.getWalletBalance();
    this.isMerchant = JSON.parse(localStorage.getItem('details'))['isMerchant'];
    if(JSON.parse(localStorage.getItem('details'))['bank']) {
      this.bank = false;
    }
  }

  getDetails() {
    this.data = this.dataService.getUserDetails();
  }

  async getWalletBalance() {
    this.phoneNumber = JSON.parse(localStorage.getItem('details'))['phoneNumber'];
    if(this.phoneNumber) {
      await this.dataService.getWalletBalance();
      this.dataService.walletBalance.subscribe(
        (val: number) => {
          this.walletBalance = val;
        }
      )
    }
  }

  sendMoneyToBank() {
    if(this.add) {
      this.add = false;
    }
    if(this.check) {
      this.check = false;
    }
    if(this.transfer) {
      this.transfer = false;
    }
    if(this.walletMoney) {
      this.walletMoney = false;
    }
    this.phoneNumber = JSON.parse(localStorage.getItem('details'))['phoneNumber'];
    if(this.phoneNumber) {
      this.dataService.sendMoneyToBank(this.phoneNumber)
        .subscribe(
          async data => {
            if(data) {
              if(data['message']) {
                await this.dataService.getWalletBalance();
                this.transferToBank = true;
              }
            }
          },
          error => { 
            // this.invalid = true;
            console.log(error);
          }
        );
    }
  }

  addWalletMoney() {
    this.walletMoney = true;
    this.getWalletBalance();
    if(this.add) {
      this.add = false;
    }
    if(this.check) {
      this.check = false;
    }
    if(this.transfer) {
      this.transfer = false;
    }
    if(this.transferToBank) {
      this.transferToBank = false;
    }
  }

  onAdd() {
    this.add = true;
    if(this.walletMoney) {
      this.walletMoney = false;
    }
    if(this.check) {
      this.check = false;
    }
    if(this.transfer) {
      this.transfer = false;
    }
    if(this.transferToBank) {
      this.transferToBank = false;
    }
  }

  onCheck() {
    this.check = true;
    if(this.walletMoney) {
      this.walletMoney = false;
    }
    if(this.add) {
      this.add = false;
    }
    if(this.transfer) {
      this.transfer = false;
    }
    if(this.transferToBank) {
      this.transferToBank = false;
    }
  }

  onTransfer() {
    this.transfer = true;
    if(this.walletMoney) {
      this.walletMoney = false;
    }
    if(this.add) {
      this.add = false;
    }
    if(this.check) {
      this.check = false;
    }
    if(this.transferToBank) {
      this.transferToBank = false;
    }
  }

  onLogout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

}