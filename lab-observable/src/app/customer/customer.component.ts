import {Component, ViewChild} from '@angular/core';
import {Customer} from "../model/customer"
import {CustomerService} from "../services/customer.service";
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  providers: [CustomerService]
})

export class CustomerComponent {
  IsAddNew$: Observable<boolean>;
  Customers$: Observable<Array<Customer>>;
  FirstName: string = "";
  LastName: string = "";
  @ViewChild('myForm') CustomerForm: NgForm;
  LoginUserFirstName:string="DummyNane"

  constructor(private custService : CustomerService, private authService : AuthenticationService) {
    const decodedToken:any = jwt_decode(localStorage?.['token']);
    this.LoginUserFirstName = decodedToken.firstName;
    this.IsAddNew$ = this.custService.IsAddNew$;
    this.Customers$ = this.custService.Customers$;
  }

  Save(){
    this.custService.Save(new Customer(this.FirstName, this.LastName));
    this.reset();
  }

  Cancel(){
    this.custService.setList();
    this.reset();
  }

  AddNew() {
    this.custService.setAddNew();
  }

  reset() {
    this.CustomerForm.reset();
  }

  logout() {
    this.authService.logout();
  }
}
