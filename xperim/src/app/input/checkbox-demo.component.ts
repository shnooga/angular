// import {FormControl, FormGroup} from "@angular/forms";
// import {Component} from "@angular/core";
//
// @Component({
//     selector: 'checkbox-demo',
//     templateUrl: '/checkbox-demo.component.html'
// })
//
// export class CheckboxDemoComponent {
//     myForm =  new FormGroup ( {
//     email: new FormControl(),
//     user: new FormControl(),
//     message: new FormControl(),
//     animalChoices: new FormControl(),
//     });
//
//     // Use the class property, myForm instead of the passed FormGroup param, fg
//     Submit (fg: FormGroup) {
//         console.log('Valid?', this.myForm.valid); // true or false
//         console.log('Name', this.myForm.value.user);
//         console.log('Email', this.myForm.value.email);
//         console.log('Message', this.myForm.value.message);
//     }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'checkbox-demo',
    templateUrl: './checkbox-demo.component.html',
})
export class CheckboxDemoComponent {

    form: FormGroup;
    selectedCheckBoxList = [];
    techStackList: any = [
        { id: 1, name: 'Angular', code : 'ANG' },
        { id: 2, name: 'Node JS', code : 'NOD' },
        { id: 3, name: 'React', code : 'REA' },
        { id: 4, name: 'Vue', code : 'VUE' },
        { id: 5, name: 'jQuery', code : 'JQU' }
    ];

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            technology: this.formBuilder.array([], [Validators.required])
        })
    }


    // controlOnChange(e) {
    controlOnChange() {
        const technologies: FormArray = this.form.get('technology') as FormArray;

        // if (e.target.checked) {
        //     technologies.push(new FormControl(e.target.value));
        //     this.selectedCheckBoxList.push(e.target.value);
        // } else {
        //     const index = technologies.controls.findIndex(technology => technology.value === e.target.value);
        //     technologies.removeAt(index);
        // }
    }

    submit(){
        console.log(this.form.value);
    }

}

