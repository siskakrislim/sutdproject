import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AppService } from "../app.service";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
})

export class FormComponent implements OnInit, OnDestroy {

    paramsSubscription:Subscription;

    currentUserId;

    qnsForm: FormGroup;
    error = false;
    week = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private appSrv: AppService
    ) {
        this.qnsForm = this.fb.group({
            q1: ['', Validators.required],
            q2: ['', Validators.required],
            q3: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.currentUserId = this.route.snapshot.params['id'];
        this.week = this.route.snapshot.params['week'];
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {

        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    onSubmit() {
        if (this.qnsForm.invalid) {
            this.error = true;
            setTimeout(() => {
                this.error = false;
            }, 2000);
            return;
        } else {
            this.appSrv.saveUserInput(this.qnsForm.value);
            let link = ['/result/' + this.currentUserId + '/' + this.week];
            this.router.navigate(link, {

            });
        }
    }

}