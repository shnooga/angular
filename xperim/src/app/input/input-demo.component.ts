import { Component, ViewChild} from "@angular/core";
import {FormControl} from '@angular/forms';

@Component({
    selector: 'input-demo',
    templateUrl: '/input-demo.component.html'
})

export class InputDemoComponent {
    // @ViewChild(NumberChildComponent)
    // private numberChild = {} as NumberChildComponent;
    name = new FormControl('');
    inputCtl = new FormControl('');
    rangeCtl = new FormControl('');
    Submit() {
        alert(this.inputCtl.value);
        alert(this.rangeCtl.value);
    }
}
