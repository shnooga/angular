export class BoomCalc {
  public boomAngle: number;

  constructor(
    public minBoomLength: number,
    public buildingOffset: number,
    public buildingHeight: number,
    public objectOffset?: number
  ) { }
}
