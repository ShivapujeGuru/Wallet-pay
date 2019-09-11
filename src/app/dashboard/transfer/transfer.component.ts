import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit,OnDestroy {

  transferForm : FormGroup;
  isSubmitted = false;
  id: number;
  sentMoney : number;
  recieverName : string;
  successMessage : string;
  failureMessage : string;
  merchantData : any;
  transferSubscription : Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeForm();
    this.getMerchantList();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.transferForm.valid) {
      this.id = JSON.parse(localStorage.getItem('details'))['id'];
      this.transferSubscription = this.dataService.transferMoney(this.id, this.transferForm.value)
        .subscribe(
          async data => {
            if(data['reciever']) {
              this.sentMoney = data['amount'];
              this.recieverName = data['reciever'].name;
              this.successMessage = data['message'];
              await this.dataService.getWalletBalance();
            } else {
              this.failureMessage = data['message'];
            }
          }, 
          error => { 
            // this.invalid = true;
            console.log(error);
          }
        );
    }
  }

  getMerchantList() {
    this.dataService.getMerchantsList()
    .subscribe(
      data => {
        if(data) {
          this.merchantData = data;
        }
      },
      error => { 
        // this.invalid = true;
        console.log(error);
      }
    );
  }

  initializeForm() {
    let recieverNumber = null;
    let amount = null;

    this.transferForm = new FormGroup({
      recieverNumber: new FormControl(recieverNumber, Validators.required),
      amount: new FormControl(amount, Validators.required)
    });
  }
  
  ngOnDestroy() {
    if(this.transferSubscription && !this.transferSubscription.closed) {
      this.transferSubscription.unsubscribe();
    }
    this.isSubmitted = false;
  }
}