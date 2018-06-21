import { EnumInExType } from "../enum/EnumInExType";

export class CapitalFlowRecord 
{
    id:number;
    groupId:number;
    groupFlag:boolean;
    recordDateTime:string;
    lastOperDateTime:string;
    flowOutAccountId:number;
    flowOutOperationId:string;
    flowInAccountId:number;
    flowInOperationId:string;
    localMoney:number;
    foreignMoney:number;
    foreignCurrencyId:number;
    exchangeRate:number;
    ownerId:number;
    inExType:EnumInExType;
    inExCategoryId:number;
    remark:string;
}

export class CapitalFlowRecordViewObject
{
    record:CapitalFlowRecord;
    flowOutAccountName:string;
    flowInAccountName:string;
    ownerName:string;
    inExCategoryName:string;
    tagsName:string[];
}