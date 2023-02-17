
export class PvpData {
  /** 主键 */

  /**主键*/

  public id!: string;

  /**创建日期*/
  public createTime!: Date;
  /**挂单者uid*/
  public uid!: string;

  /**0上架 ，1已卖出*/

  public status!: string;
  /**goods_url*/

  public goodsUrl!: string;
  /**goods_name*/

  public goodsName!: string;
  /**goods_type*/

  public goodsType!: string;

  /**类型 0，1，2 1v1 3v3 大乱斗*/
  public pvpType!: string;
  /**战斗时间*/
  public pvpTime!: Date;


  /**奖励*/

  public reward!: string;
  /**胜利失败*/

  public sucFail!: number;
}