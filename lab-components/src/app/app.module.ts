import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './route/app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TokenInterceptorService } from './Interceptors/http.interceptor';
import { MultiRndService, MultiRndService2, RND_TOKEN } from './services/multi-rnd.service';
import {CustomerAddComponent} from "./customer/customer-add.component";
import {CustomerListComponent} from "./customer/customer-list.component";
import {ErrorTestComponent} from "./errortest/errortest.component";
import {initializeConfig} from "./services/appinitializer.service";
import {AppConfigService} from "./services/appconfig.service";
import {ErrorComponent} from "./error/error.component";
import {AppErrorsHandler} from "./services/app-error-handler.service";

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    LoginComponent,
    CustomerAddComponent,
    CustomerListComponent,
    ErrorTestComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: APP_INITIALIZER, useFactory: initializeConfig, multi: true, deps:[AppConfigService]},
    {provide: ErrorHandler, useClass: AppErrorsHandler},
// {provide: MultiRndService, useClass: MultiRndService},
    // {provide: MultiRndService, useClass: MultiRndService2},
    // {provide: MultiRndService, useClass: MultiRndService, multi: true},
    // {provide: MultiRndService, useClass: MultiRndService2, multi: true},
    // , {provide: 'RND_VALUE', useClass: MultiRndService, multi: true},
    //   {provide: 'RND_VALUE', useClass: MultiRndService2, multi: true},
    {provide: RND_TOKEN, useClass: MultiRndService, multi: true},
    {provide: RND_TOKEN, useClass: MultiRndService2, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
