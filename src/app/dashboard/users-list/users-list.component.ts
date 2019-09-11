import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  userData: [];
  invalid = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUsersList()
    .subscribe(
      data => {
        if(data) {
          this.userData = data;
        }
      },
      error => { 
        this.invalid = true;
        console.log(error);
      }
    );
  }

}
