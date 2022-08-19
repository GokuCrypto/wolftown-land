


/*提现业务 */
export class Withdraw {
  /**id*/

  public id!: number;
  /**用户id*/

  public uid!: number;
  /**用户名*/

  public username!: string;
  /**加密货币代号，大写字母 BTC，LTC，ETH*/

  public coin!: string;
  /**币种资产类型*/

  public tokenBase!: string;
  /**合约地址*/

  public contractAddress!: string;
  /**批次号*/

  public batchNo!: string;
  /**提现金额*/

  public amount!: number;

  public fee!: number;
  /**实际花费区块链手续费*/

  public realFee!: number;
  /**实际发币数量*/

  public payAmount!: number;
  /**来源地址，暂未使用*/

  public addressFrom!: string;
  /**到账地址*/

  public addressTo!: string;
  /**区块链交易ID*/

  public txid!: string;
  /**区块确认数*/

  public confirmations!: number;
  /**提现状态: 0 未审核，1 审核通过，2 支付中已经打币，3 支付失败，4 已完成，5 审核拒绝, 6 已撤销*/

  public status!: number;
  /**密文*/

  public encrypt!: string;
  /**审核时间戳*/

  public auditTime!: Date;
  /**审核用户*/

  public auditUser!: string;
  /**版本号*/

  public version!: number;
  /**创建时间*/

  public ctime!: Date;
  /**更新时间*/

  public mtime!: Date;
}

export interface WithdrawForm {
  coin: string;
  tokenBase: string;
  amount: number;
  addressTo: string;
}