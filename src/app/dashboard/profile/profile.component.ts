import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data : any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.data = this.dataService.getUserDetails();
  }

}
