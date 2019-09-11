import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  regForm : FormGroup;
  isSubmitted = false;
  matched = false;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.regForm.valid) {
      if(this.regForm.value.password == this.regForm.value.cPassword) {
        this.matched = false;        
        this.dataService.createUser(this.regForm.value)
        .subscribe(
          data => {
            if(data) {
              this.regForm.reset();
              this.router.navigate(['dashboard-layout/profile']);
            } else {
              // this.invalid = true;
            }
          }, 
          error => { 
            console.log(error);
          });
        for( let i in this.regForm.controls ) {
          this.regForm.controls[i].setErrors(null);
        }
      } else {
        this.matched = true;
        console.log("Passwords don't match");
      }
    }
  }

  initializeForm() {
    let username = null;
    let email = null;
    let phoneNumber = null;
    let password = null;
    let cPassword = null;
    let merchant = false;

    this.regForm = new FormGroup({
      username: new FormControl(username, [Validators.required, Validators.minLength(8)]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required, Validators.minLength(10),
        Validators.pattern('^[0-9]*$')]),
      password: new FormControl(password, [Validators.required, Validators.minLength(8)]),
      cPassword: new FormControl(cPassword, [Validators.required, Validators.minLength(8),
        Validators.pattern('password')]),
      merchant: new FormControl(merchant)
    });
  }
}