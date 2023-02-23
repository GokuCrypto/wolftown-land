
export class WolfMarket {
  /** 主键 */

  /**主键*/

  public id!: string;

  /**创建日期*/
  public createTime!: Date;
  /**挂单者uid*/
  public uid!: string;
  /**价格*/

  public price!: number;
  /**0上架 ，1已卖出*/

  public status!: string;
  /**goods_url*/

  public goodsUrl!: string;
  /**goods_name*/

  public goodsName!: string;
  /**goods_type*/

  public goodsType!: string;
  /**购买者uid*/

  public buyerUid!: string;
  /**0一口价 1竞拍*/

  public type!: string;
  /**竞拍最低价格*/

  public lowestBiddingPrice!: number;
  /**起拍价*/

  public startPrice!: number;
  /**竞拍记录*/

  public biddingId!: string;
  /**竞拍结束时间*/

  public biddingEndTime!: Date;
  /**当前竞拍价格*/

  public biddingPrice!: number;
  /**背包id*/

  public userGoodsId!: string;
  /**货币*/

  public currency!: string;
  /**出价次数*/

  public numberOfBids!: number;

  /*价格升降 */

  /*时间升降 */
}