import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLoggedIn: any;

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.userLoggedIn = localStorage.getItem('loggedIn');
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['registration']);
  }

  onLogout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

}