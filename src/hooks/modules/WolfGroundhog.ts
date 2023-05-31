
export class WolfGroundhog {
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


  /**开始时间*/
  public startTime!: Date;
  /**结束时间*/
  public endTime!: Date;
  /**启用标志*/
  public isOn!: number;
  /**启用土地自动收割*/
  public landStatus!: number;
  /**粪球自动使用标志*/
  public shitStatus!: number;
  /**物品自动合成*/
  public goodsAutoSynthesis!: number;
  /**物品自动捐赠*/
  public goodsInvite!: number;
  /**自动攻城战标志*/
  public arenaStatus!: number;
  /**攻城战配置*/
  public arenaDetails!: string;


  /**自动捐赠配置*/
  public inviteDetail!: string;
  /**物品自动合成配置*/
  public synthesisDetail!: string;

}