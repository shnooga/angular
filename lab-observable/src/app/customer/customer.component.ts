import {Component, ViewChild} from '@angular/core';
import {Customer} from "../model/customer"
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
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
  // @ViewChild('myForm') CustomerForm: NgForm;
  LoginUserFirstName:string="DummyNane"
  inputForm: FormGroup;

  constructor(private fb: FormBuilder, private custService : CustomerService, private authService : AuthenticationService) {
    const decodedToken:any = jwt_decode(localStorage?.['token']);
    this.LoginUserFirstName = decodedToken.firstName;
    this.IsAddNew$ = this.custService.IsAddNew$;
    this.Customers$ = this.custService.Customers$;

    this.inputForm = this.fb.group({
      FName: '',
      LName: ''
    })
  }

  Save(){
    this.custService.Save(new Customer(this.inputForm.value.FName, this.inputForm.value.LName));
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
    this.inputForm.reset();
  }

  logout() {
    this.authService.logout();
  }

  FailsRequired(inputName: string): boolean {
    let f = this.inputForm.get(inputName);
    console.log(inputName + " failsMinChar: " + !(f?.dirty && f.errors?.['minlength']));
    return !(f?.dirty && f.errors?.['required']);
  }

  FailsMinChar(inputName: string): boolean {
    let f = this.inputForm.get(inputName);
    console.log(inputName + " failsMinChar: " + !(f?.dirty && f.errors?.['minlength']) + " dirty: " + f?.dirty + " errors[minlength]: " + f?.errors?.['minLength']);
    return !(f?.dirty && f.errors?.['minlength']);
  }
}
