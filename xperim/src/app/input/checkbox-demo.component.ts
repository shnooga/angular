import {Component} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'checkbox-demo',
    templateUrl: './checkbox-demo.component.html',
})

export class CheckboxDemoComponent {
    myForm: FormGroup;
    currentValue: any;
    selectedCheckboxes: string[] =[];

    techStackList: any = [
        { id: 1, name: 'Angular', code : 'ANG' },
        { id: 2, name: 'Node JS', code : 'NOD' },
        { id: 3, name: 'React', code : 'REA' },
        { id: 4, name: 'Vue', code : 'VUE' },
        { id: 5, name: 'jQuery', code : 'JQU' }
    ];

    constructor(private formBuilder: FormBuilder) {
        this.myForm = this.formBuilder.group({
            technology: this.formBuilder.array([], [Validators.required])
        })
    }

    controlOnChange(e : Event) {
        // Must cast as HtlmInputElement otherwise property checked will not be accessible
        var targetElement = e.target as HTMLInputElement;
        const technologies: FormArray = this.myForm.get('technology') as FormArray;

        if (targetElement.checked) {
            technologies.push(new FormControl(targetElement.value));
            this.selectedCheckboxes.push(targetElement.value);
        } else {
            let index = technologies.controls.findIndex(technology => technology.value === targetElement.value);
            technologies.removeAt(index);
            this.selectedCheckboxes= this.selectedCheckboxes.filter((e, i) => e !== targetElement.value);
        }
    }

    submit(){
        console.log(this.myForm.value);
    }
}

