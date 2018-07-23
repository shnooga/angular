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
  model = new BoomCalc(142, 30, 25);
  constructor() { }

  ngOnInit() {
    this.model.jibAngle = 0;
    this.model.jibLength = 10;
    this.model.insertQty = 0;
    this.model.insertLength = 0;
    this.model.craneBaseHeight = 10;
  }

  onSubmit() {
    this.submitted = true;
    const boomLength = this.model.minBoomLength;
    const bldOffset = this.model.buildingOffset;
    const adjBldHeight = this.model.buildingHeight - this.model.craneBaseHeight;
    const hypo1 = this.calculateHypotenuse(bldOffset, adjBldHeight);
    // alert(hypo1);
    this.model.boomAngleStr = toTwoDecimal(this.extractBoomAngle());
    const objectOffSet = bldOffset * (boomLength - hypo1) / hypo1;
    this.model.objectOffsetStr = toTwoDecimal(objectOffSet);
    this.model.overallRadiusStr = toTwoDecimal( bldOffset
      + objectOffSet
      + Math.cos(toRadian(this.extractJibAngle())) * this.model.jibLength);
    this.model.overallBoomLengthStr = toTwoDecimal(this.model.minBoomLength + (this.model.insertQty * this.model.insertLength));
  }
  resetInput() {
    this.model = new BoomCalc(null, null, null);
  }
  calculateHypotenuse(adjLen: number, oppositeLen: number) {
    return Math.sqrt(Math.pow(adjLen, 2) + Math.pow(oppositeLen, 2));
  }

  extractBoomAngle() {
    return toDegree(Math.atan( (this.model.buildingHeight - this.model.craneBaseHeight) / this.model.buildingOffset));
  }

  extractJibAngle() {
    return Math.abs(this.extractBoomAngle() - this.model.jibAngle);
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    const bldOffset = this.model.buildingOffset;
    const adjBldHeight = this.model.buildingHeight - this.model.craneBaseHeight;
      // return JSON.stringify(this.model)
    return 'adjBldHeight = bldHeight - craneBase = '  + adjBldHeight
        + '  |   Boom Angle = atan(adjBldHeight/bldOffset) = ' + this.model.boomAngleStr
        + '  |   hypotenuse = sqrt(adjBldHeight^2 + bldOffset^2) = ' + this.calculateHypotenuse(adjBldHeight, bldOffset)
        + '  |   objectOffset = bldOffset * (boomLength - hypotenuse) / hypotenuse = ' + this.model.objectOffsetStr
        + '  |   adjJibAngle = abs(boomAngle - jibOffsetAngle) = ' + this.extractJibAngle()
        + '  |   jibLength: ' + this.model.jibLength
        + '  |   jibOffsetLength = cos(adjJibAngle) * jibLength = ' + (Math.cos(toRadian(this.extractJibAngle())) * this.model.jibLength)
        + '  |   Overall Radius = bldOffSet + objectOffset + jibOffsetLength = ' + this.model.overallRadiusStr;
  }
}
