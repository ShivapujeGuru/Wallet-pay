import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-check-balance',
  templateUrl: './check-balance.component.html',
  styleUrls: ['./check-balance.component.css']
})
export class CheckBalanceComponent implements OnInit {

  phoneNumber: number;
  balance : number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.checkBalance();
  }

  checkBalance() {
    this.phoneNumber = JSON.parse(localStorage.getItem('details'))['phoneNumber'];
    if(this.phoneNumber) {
      this.dataService.checkBalance(this.phoneNumber)
        .subscribe(
          data => {
            if(data) {
              setInterval(() => {
                this.balance = data['balance'];
              }, 500);
            }
          },
          error => { 
            // this.invalid = true;
            console.log(error);
          }
        );
    }
  }
}