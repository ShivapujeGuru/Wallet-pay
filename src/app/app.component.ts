import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from './services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // this.initializeForm();
  }

  // onSubmit() {
    // this.loginService.createUser(this.loginForm.value);
    // this.loginForm.reset();
  // }

  // initializeForm() {
  //   let username = null;
  //   let password = null;

  //   this.loginForm = new FormGroup({
  //     username: new FormControl(username, Validators.required),
  //     password: new FormControl(password, Validators.required)
  //   });
  // }
}