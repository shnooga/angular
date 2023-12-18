import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Customer} from "../model/customer";
@Component({
    selector: 'customer-add',
    templateUrl: './customer-add.component.html'
})

export class CustomerAddComponent implements AfterViewInit {
    FirstName: string;
    LastName: string;

    @ViewChild('myForm') CustomerForm: NgForm;
    @ViewChild('firstName') FirstNameControl: ElementRef;

    Reset() {
        this.CustomerForm.reset();
    }

    @Output() OnSave:EventEmitter<Customer> = new EventEmitter<Customer>();
    Save() {
       this.OnSave.emit(new Customer(this.FirstName, this.LastName));
    }

    @Output() OnCancel:EventEmitter<void> = new EventEmitter<void>();
    Cancel() {
        this.OnCancel.emit();
        this.Reset();
    }

    constructor() {
        this.FirstNameControl.nativeElement.focus();
    }

    ngAfterViewInit(): void {
        this.FirstNameControl.nativeElement.focus();
    }

    // FailsRequired(inputName: string): boolean {
    //     let f = this.inputForm.get(inputName);
    //     console.log(inputName + " failsMinChar: " + !(f?.dirty && f.errors?.['minlength']));
    //     return !(f?.dirty && f.errors?.['required']);
    // }
    //
    // FailsMinChar(inputName: string): boolean {
    //     let f = this.inputForm.get(inputName);
    //     console.log(inputName + " failsMinChar: " + !(f?.dirty && f.errors?.['minlength']) + " dirty: " + f?.dirty + " errors[minlength]: " + f?.errors?.['minLength']);
    //     return !(f?.dirty && f.errors?.['minlength']);
    // }
}
