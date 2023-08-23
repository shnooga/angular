import { Component} from "@angular/core";

@Component(({
  selector: 'app-number',
  template: '<b>{{message}}</b>'
}))

export class NumberChildComponent {
  message:string ='';
  count:number = 0;

  increment() {
    this.count +=1;
    this.message = "Counter: " + this.count;
  }

  decrement() {
    this.count -=1;
    this.message = "Counter: " + this.count;
  }
}
