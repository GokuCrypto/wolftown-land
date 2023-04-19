//商城贩卖商品数据
export class WolfTownStore {

  public id!: string;

  /** 创建日期 */

  public createBy!: String;
  /**创建人*/

  public createTime!: Date;
  /** 更新人 */

  public updateBy!: string;

  /** 更新日期 */
  public updateTime!: Date;

  /**所属部门*/
  public sysOrgCode!: String;

  /** 加密货币*/
  public coin!: String;
  /**价格*/

  public price!: number;
  /**商品名称*/

  public goodsName!: String;
  /**url*/

  public goodsUrl!: String;
  /**商品类型*/

  public goodsType!: String;

  /**库存量*/

  public inventory!: number;

}