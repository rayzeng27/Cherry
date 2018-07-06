import { EnumInExType } from "../enum/inex-type.enum";

/**
 * 所有字段和后端的entity保持一致，用于跟后端交互
 */
export class CapitalFlowRecord 
{
    id : number;
    groupId : number;
    groupFlag : boolean;
    recordDateTime : Date;
    lastOperDateTime : string;
    flowOutAccountId : number;
    flowOutOperationId : string;
    flowInAccountId : number;
    flowInOperationId : string;
    localMoney : number;
    foreignMoney : number;
    foreignCurrencyId : number;
    exchangeRate : number;
    ownerId : number;
    inExType : EnumInExType;
    inExCategoryId : number;
    tagIdList : number[];
    remark : string;
}

/**
 * 在CapitalFlowRecord的基础上添加界面显示需要的字段
 */
export class CapitalFlowRecordViewObject extends CapitalFlowRecord
{
    flowOutAccountName : string;
    flowInAccountName : string;
    ownerName : string;
    inExCategoryName : string;
    tagNames : string[];
}