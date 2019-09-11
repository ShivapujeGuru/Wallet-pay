import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data : any;
  walletMoney = false;
  add = false;
  check = false;
  transfer = false;
  phoneNumber : number;
  walletBalance : number;
  userLoggedIn: any;

  constructor(private router: Router) { }

  ngOnInit() {}
}