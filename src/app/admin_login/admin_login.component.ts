import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
    selector: "app-admin-login",
    templateUrl: "./admin_login.component.html",
    styleUrls: ["./admin_login.component.css"],
})

export class AdminLoginComponent implements OnInit {
    loginForm: FormGroup;
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
            id: ['00003', Validators.required]
        });
    }

    onLogin() {
        if (this.loginForm.invalid) { // to check if the user have filled up all the fields in the form
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 2000);
            return;
        }

        let admin = this.appSrv.adminLogin(this.loginForm.value.id);
        if (admin) {
            let link = ['/summary/' + admin['id'] + '/' + admin['name']];
            this.router.navigate(link, {

            });
        } else {
            this.invalidUser = true;
            setTimeout(() => {
                this.invalidUser = false;
            }, 2000);
        }

    }

}