import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BuyItemData } from 'src/app/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  itemData = [];
  senderId : string;
  isMerchant = false;

  constructor(private dataService: DataService,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getItemsList();
    this.isMerchant = this.dataService.getUserDetails().isMerchant;
    this.senderId = this.dataService.getUserDetails().id;
  }

  // ngAfterViewInit() {
  //   console.log(this.buyItemData);
  //   this.ngxSmartModalService.setModalData(this.buyItemData, 'itemData');
  // }

  getItemsList() {
    this.dataService.getItemsList()
    .subscribe(
      data => {
        if(data) {
          this.itemData = data;
        }
      },
      error => { 
        // this.invalid = true;
        console.log(error);
      }
    );
  }

  buyItem(item: BuyItemData) {
    this.dataService.buyItem(this.senderId, item)
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}