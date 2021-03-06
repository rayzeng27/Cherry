export enum EnumInExType
{
    /** 收支类型:转移 - 用于记录在不同的两个账户之间进行资金转移的操作，不涉及收支 */
    NONE = "NONE",

    /** 收支类型:收入 */
    INCOME = "INCOME",

    /** 收支类型:支出 */
    EXPENSES = "EXPENSES",

    /** 收支类型：注释 - 用于记录一些生活中跟钱有关的信息，但即不涉及收支，也没有各种强校验检查 */
    COMMENT = "COMMENT"
}