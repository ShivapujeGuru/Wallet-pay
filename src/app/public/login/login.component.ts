import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  isSubmitted = false;
  userData = [];
  message : any;
  invalid = false;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.loginForm.valid) {
      this.dataService.signinUser(this.loginForm.value)
        .subscribe(
          data => {
            if(data) {
              this.userData = data;
              localStorage.setItem('loggedIn', 'true');
              this.loginForm.reset();
              this.router.navigate(['/dashboard-layout/profile']);
            } else {
              this.invalid = true;
            }
          }, 
          error => {
            console.log(error);
            this.invalid = true;
          }
        );
    }
  }

  signUp() {
    this.router.navigate(['/registration']);
  }

  initializeForm() {
    let phoneNumber = null;
    let password = null;

    this.loginForm = new FormGroup({
      phoneNumber: new FormControl(phoneNumber, Validators.required),
      password: new FormControl(password, Validators.required)
    });
  }

}