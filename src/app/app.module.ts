import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';

import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { AdminLoginComponent } from './admin_login/admin_login.component';
import { ResultComponent } from './result/result.component';
import { SummaryComponent } from './summary/summary.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    AdminLoginComponent,
    ResultComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
