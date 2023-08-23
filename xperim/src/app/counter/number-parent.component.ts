import { Component, ViewChild} from "@angular/core";
import { NumberChildComponent} from "./number-child/number-child.component";

@Component({
  selector: 'app-number-parent',
  templateUrl: '/number-parent.component.html'
})

export class NumberParentComponent {
  @ViewChild(NumberChildComponent)
  private numberChild = {} as NumberChildComponent;

  increase() {
    this.numberChild.increment();
  }

  decrease() {
    this.numberChild.decrement();
  }
}
