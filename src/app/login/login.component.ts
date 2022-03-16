import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    weekForm: FormGroup;
    userExist = false;
    error = false;
    currentUser: any;
    invalidUser = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private appSrv: AppService
    ) {

    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            class: ['001', Validators.required], // remove the 001 value when you want to release to production
            id: ['001', Validators.required], // remove the 001 value when you want to release to production
            group: ['01', Validators.required] // remove the 01 value when you want to release to production
        });
        this.weekForm = this.fb.group({
            week: ['01', Validators.required] // remove the 01 value when you want to release to production
        });
    }

    onLogin() { // check if the user data is in data base
        if (this.loginForm.invalid) { // to check if the user have filled up all the fields in the form
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 2000);
            return;
        }

        const user = { class: this.loginForm.value.class, id: this.loginForm.value.id, group: this.loginForm.value.group }

        let check = this.appSrv.login(user);
        if (check) {
            this.userExist = true;
            this.currentUser = user;
        } else {
            this.invalidUser = true;
            setTimeout(() => {
                this.invalidUser = false;
            }, 2000);
        }

    }

    onNext() {
        if (this.weekForm.invalid) {
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 2000);
            return;
        } else {
            let link = ['/form/' + this.currentUser['id'] + '/' + this.weekForm.value.week];
            this.router.navigate(link, {

            });
        }
    }

}

