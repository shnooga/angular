import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from "../model/customer"
// import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html'
})

export class CustomerComponent {
  Customers:Array<Customer>;
  IsAddNew:boolean;
  FName: string = "";
  LName: string = "";
  // @ViewChild('myForm') CustomerForm: NgForm;
  LoginUser:string="DummyNane"

  constructor() {
    // const decodedToken = jwt_decode(localStorage['token']);
    // this.LoginUser = decodedToken.FName;

    this.IsAddNew = false;

    this.Customers = new Array<Customer>;
    this.Customers.push(new Customer("Sukesh","Marla"));
    this.Customers.push(new Customer("Just","Compile"));
    this.Customers.push(new Customer("Charlie", "Brown"));
  }

  Save(){
    this.Customers.push(new Customer(this.FName, this.LName));
    this.ToggleAdd(false);
    this.reset();
  }

  Cancel(){
    this.ToggleAdd(false);
    this.reset();
  }

  AddNew() {
    this.ToggleAdd(true);
  }

  reset() {
    // this.CustomerForm.resetl();
    this.FName="";
    this.LName="";
  }

  ToggleAdd(hide: boolean) {
    this.IsAddNew = hide;
  }

  logout() {
    localStorage.clear();
  }
}
