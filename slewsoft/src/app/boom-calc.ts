export class BoomCalc {
  public boomAngleStr: string;
  public objectOffsetStr: string;

  constructor(
    public minBoomLength: number,
    public buildingOffset: number,
    public buildingHeight: number
  ) { }
}
