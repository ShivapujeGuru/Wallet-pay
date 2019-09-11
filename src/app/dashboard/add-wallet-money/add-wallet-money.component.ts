import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-wallet-money',
  templateUrl: './add-wallet-money.component.html',
  styleUrls: ['./add-wallet-money.component.css']
})
export class AddWalletMoneyComponent implements OnInit,OnDestroy {

  addWalletMoneyForm : FormGroup;
  isSubmitted = false;
  userId : number;
  addingAmount : number;
  message : string;
  addWalletMoneySubscription : Subscription;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.addWalletMoneyForm.valid) {
      this.userId = JSON.parse(localStorage.getItem('details'))['id'];
      this.addingAmount = this.addWalletMoneyForm.value.amount;
      this.dataService.addWalletMoney(this.userId, this.addingAmount)
        .subscribe(
          async data => {
            if(data['data']) {
              this.addWalletMoneyForm.reset();
              await this.dataService.getWalletBalance();
            } else {
              this.message = data['message'];
            }
          }, 
          error => { 
            // this.invalid = true;
            console.log(error);
          }
        );
    }
  }

  initializeForm() {
    let amount = null;

    this.addWalletMoneyForm = new FormGroup({
      amount: new FormControl(amount, Validators.required)
    });
  }

  ngOnDestroy() {
    if(this.addWalletMoneySubscription) {
      this.addWalletMoneySubscription.unsubscribe();
    }
  }
}