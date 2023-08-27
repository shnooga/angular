import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";

@Component({
    selector: 'formcontrol-demo',
    templateUrl: '/formgroup-demo.component.html'
})

export class FormgroupDemoComponent {
    myForm = new FormGroup({
        email: new FormControl('charlie@formgroup.com'),
        user: new FormControl('FormGroup'),
        message: new FormControl("Using FormGroup"),
        animalChoices: new FormControl(),
    });

    // Use the class property, myForm instead of the passed FormGroup param, fg
    Submit(fg: FormGroup) {
        console.log('Valid?', this.myForm.valid); // true or false
        console.log('Name', this.myForm.value.user);
        console.log('Email', this.myForm.value.email);
        console.log('Message', this.myForm.value.message);
    }
}

