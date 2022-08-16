
export class BetOrder {
  /** 主键 */

  public id!: string;

  /** 创建日期 */

  public createTime!: Date;
  /** 更新人 */

  public updateBy!: string;

  /** 更新日期 */
  public updateTime!: Date;

  /** uid */

  public uid!: string;
  /** 投注房间 */

  public room!: string;
  /** 投注金额 */

  public amount!: number;
  /** 结果 */

  public result!: string;
  /** 所属代理 */

  public agent!: string;
  /** 投注类型 */

  public bettingType!: number;
  /** 玩法 */

  public playType!: number;
  /** 投注内容 */

  public bettingContentString!: string;

  /* 倍数 */
  public multiple!: string;
}