import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    details: any;

    constructor(private router: Router) {}

    canActivate() {
        this.details = JSON.parse(localStorage.getItem('details'));
        if(this.details) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}