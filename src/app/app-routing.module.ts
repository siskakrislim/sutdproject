import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { FormComponent } from "./form/form.component";
import { AdminLoginComponent } from "./admin_login/admin_login.component";
import { ResultComponent } from "./result/result.component";
import { SummaryComponent } from "./summary/summary.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'form/:id/:week', component: FormComponent },
    { path: 'admin', component: AdminLoginComponent },
    { path: 'result/:id/:week', component: ResultComponent },
    { path: 'summary/:id/:name', component: SummaryComponent},
    { path: '**', redirectTo: 'login' },
  ];

@NgModule({
 imports: [
     RouterModule.forRoot(appRoutes)
 ],
 exports: [
     RouterModule
 ]
})

export class AppRoutingModule {

}