import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  addAccForm : FormGroup;
  isSubmitted = false;
  bankData = [];
  bankDetails = [];
  id: any;
  accNum: any;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeForm();
    this.getBankDetails();
  }

  getBankDetails() {
    this.bankDetails = this.dataService.getBankDetails();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.addAccForm.valid) {
      this.id = JSON.parse(localStorage.getItem('details'))['id'];
      this.dataService.addBankDetails(this.addAccForm.value, this.id)
        .subscribe(
          data => {
            if(data) {
              this.accNum = this.addAccForm.value.accountNumber;
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
    let accountNumber = null;
    let bankName = null;
    let balance = null;

    this.addAccForm = new FormGroup({
      accountNumber: new FormControl(accountNumber, Validators.required),
      bankName: new FormControl(bankName, Validators.required),
      balance: new FormControl(balance, Validators.required)
    });
  }
}
