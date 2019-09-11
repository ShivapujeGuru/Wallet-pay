import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.css']
})
export class PrivateNavbarComponent implements OnInit {

  isMerchant = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
    this.isMerchant = JSON.parse(localStorage.getItem('details'))['isMerchant'];
  }

  onLogout() {
    this.router.navigate(['/home']);
    localStorage.clear();
  }

}