import { Component, ViewChild } from '@angular/core';
import { Customer } from "../model/customer"

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
