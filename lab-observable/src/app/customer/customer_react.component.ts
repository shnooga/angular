// Put UI behavior in this instead of template. ie FailsRequired()
import {Component} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Customer } from "../model/customer"
@Component({
  selector: 'customer_react',
  templateUrl: './customer_react.component.html'
})

export class Customer_ReactComponent {
  Customers:Array<Customer>;
  IsAddNew:boolean;
  inputForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      FName: '',
      LName: ''
    });

    this.IsAddNew = false;
    this.Customers = new Array<Customer>;

    this.Customers.push(new Customer("Bruce","Wayne"));
    this.Customers.push(new Customer("Peter","Parker"));
    this.Customers.push(new Customer("Charlie", "Brown"));
  }

  Save(){
    this.Customers.push(new Customer(this.inputForm.value.FName, this.inputForm.value.LName));
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
    this.inputForm.reset();
  }

  ToggleAdd(hide: boolean) {
    this.IsAddNew = hide;
  }

  FailsRequired(inputName: string): boolean {
    let f = this.inputForm.get(inputName);
    return !(f?.dirty && f.errors?.['required']);
  }

  FailsMinChar(inputName: string): boolean {
    let f = this.inputForm.get(inputName);
    return !(f?.dirty && f.errors?.['minlength']);
  }
}
