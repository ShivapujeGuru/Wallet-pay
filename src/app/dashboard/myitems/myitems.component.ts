import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data';

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrls: ['./myitems.component.css']
})
export class MyitemsComponent implements OnInit {

  senderId: any;
  userItemsList: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.senderId = this.dataService.getUserDetails().id;
    this.getUserItems(this.senderId);
  }

  getUserItems(id) {
    this.dataService.getUserItemsList(id)
      .subscribe(
        data => {
          this.userItemsList = data;
        },
        error => { 
          // this.invalid = true;
          console.log(error);
        }
      );
  }

}
