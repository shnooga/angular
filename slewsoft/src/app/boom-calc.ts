export class BoomCalc {
  public boomAngleStr: string;
  public objectOffsetStr: string;
  public jibOffset: number;
  public jibInsertQty: number;
  public jibInsertLength: number;

  constructor(
    public minBoomLength: number,
    public buildingOffset: number,
    public buildingHeight: number
  ) { }
}
