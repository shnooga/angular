import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'formbuilder-demo',
    templateUrl: '/formgroup-demo.component.html'
})

export class FormbuilderDemoComponent {
    myForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.myForm = this.fb.group({
            user: 'FormBuilder',
            email: 'Snoopy@formbuilder.com',
            message: 'Using FormBuilder'
        });
    }

    // Directly use the passed in FormGroup instead of the class FormGroup property, myForm
    Submit(fg: FormGroup) {
        console.log('Valid?', fg.valid); // true or false
        console.log('Name', fg.value.user);
        console.log('Email', fg.value.email);
        console.log('Message', fg.value.message);
    }
}
