import { Component, OnInit } from '@angular/core';
import {BoomCalc} from '../boom-calc';

@Component({
  selector: 'app-boom-calc-form',
  templateUrl: './boom-calc-form.component.html',
  styleUrls: ['./boom-calc-form.component.css']
})
export class BoomCalcFormComponent implements OnInit {
  private submitted = false;
  protected model = new BoomCalc(3,4, 5);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    const boomLength = this.model.minBoomLength;
    const bldOffset = this.model.buildingOffset;
    const bldHeight = this.model.buildingHeight;
    const hypo1 = Math.sqrt(Math.pow(bldOffset, 2) + Math.pow(bldHeight, 2));
    // alert(hypo1);
    this.model.boomAngle = this.toDegree(Math.atan(bldHeight / bldOffset));
    this.model.objectOffset = bldOffset * (boomLength - hypo1) / hypo1;
  }
  resetInput() {
    this.model = new BoomCalc(null,null,null,null);
  }

  toDegree(radians: number) {
    return radians * (180 / Math.PI);
  }
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
