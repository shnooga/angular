import { Component, OnInit } from '@angular/core';
import {BoomCalc} from '../boom-calc';

@Component({
  selector: 'app-boom-calc-form',
  templateUrl: './boom-calc-form.component.html',
  styleUrls: ['./boom-calc-form.component.css']
})
export class BoomCalcFormComponent implements OnInit {
  private submitted = false;
  protected model = new BoomCalc(3,4, 5, 6);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    alert('boom');
  }
  resetInput() {
    this.model = new BoomCalc(null,null,null,null);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
