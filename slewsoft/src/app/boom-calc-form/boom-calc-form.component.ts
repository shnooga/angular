import { Component, OnInit } from '@angular/core';
import {BoomCalc} from '../boom-calc';

function toDegree(radians: number) { return radians * (180 / Math.PI); }
function toRadian(degree: number) { return degree * (Math.PI / 180); }
function toTwoDecimal(num: number) { return num.toFixed(2); }

@Component({
  selector: 'app-boom-calc-form',
  templateUrl: './boom-calc-form.component.html',
  styleUrls: ['./boom-calc-form.component.css']
})

export class BoomCalcFormComponent implements OnInit {
  private submitted = false;
  model = new BoomCalc(3, 4, 5);
  constructor() { }

  ngOnInit() {
    this.model.jibAngle = 0;
    this.model.jibLength = 0;
    this.model.insertQty = 0;
    this.model.insertLength = 0;
    this.model.craneBaseHeight = 0;
  }

  onSubmit() {
    this.submitted = true;
    const boomLength = this.model.minBoomLength;
    const bldOffset = this.model.buildingOffset;
    const bldHeight = this.model.buildingHeight - this.model.craneBaseHeight;
    const hypo1 = Math.sqrt(Math.pow(bldOffset, 2) + Math.pow(bldHeight, 2));
    // alert(hypo1);
    this.model.boomAngleStr = toTwoDecimal(toDegree(Math.atan(bldHeight / bldOffset)));
    this.model.boomAngleStr = toTwoDecimal(this.extractBoomAngle());
    this.model.objectOffsetStr = toTwoDecimal(bldOffset * (boomLength - hypo1) / hypo1);
    this.model.overallRadiusStr = toTwoDecimal( bldOffset + Math.cos(toRadian(this.extractJibAngle())) * this.model.jibLength);
    this.model.overallBoomLengthStr = toTwoDecimal(this.model.minBoomLength + (this.model.insertQty * this.model.insertLength));
  }
  resetInput() {
    this.model = new BoomCalc(null, null, null);
  }

  extractBoomAngle() {
    return toDegree(Math.atan(this.model.buildingOffset / (this.model.buildingHeight - this.model.craneBaseHeight)));
  }

  extractJibAngle() {
    return Math.abs(this.extractBoomAngle() - this.model.jibAngle);
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
