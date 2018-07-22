export class BoomCalc {
  public boomAngleStr: string;
  public objectOffsetStr: string;
  public jibAngle: number;
  public jibLength: number;
  public insertQty: number;
  public insertLength: number;

  constructor(
    public minBoomLength: number,
    public buildingOffset: number,
    public buildingHeight: number
  ) { }
}
