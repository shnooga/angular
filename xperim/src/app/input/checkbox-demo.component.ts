import {FormControl, FormGroup} from "@angular/forms";
import {Component} from "@angular/core";

@Component({
    selector: 'checkbox-demo',
    templateUrl: '/checkbox-demo.component.html'
})

export class CheckboxDemoComponent {
    formGroup =  new FormGroup ( {
    email: new FormControl(),
    user: new FormControl(),
    message: new FormControl(),
    animalChoices: new FormControl(),
});
    Submit (fg: FormGroup) {
        // alert(this.formGroup.get('user')?.value);
        console.log('Valid?', this.formGroup.valid); // true or false
        console.log('Name', this.formGroup.value.user);
        console.log('Email', this.formGroup.value.email);
        console.log('Message', this.formGroup.value.message);
    }

}

