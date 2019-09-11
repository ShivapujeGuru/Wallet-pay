import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addItemForm : FormGroup;
  isSubmitted = false;
  message : string;
  itemName : string;
  phoneNumber : string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeForm();
    this.phoneNumber = this.dataService.getUserDetails().phoneNumber;
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.addItemForm.valid) {
      this.dataService.addItem(this.addItemForm.value, this.phoneNumber)
        .subscribe(
          data => {
            if(data['item']) {
              this.message = data['message']
              this.itemName = data['item'].itemName;
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
    let itemName = null;
    let itemPrice = null;

    this.addItemForm = new FormGroup({
      itemName: new FormControl(itemName, Validators.required),
      itemPrice: new FormControl(itemPrice, Validators.required)
    });
  }

}
