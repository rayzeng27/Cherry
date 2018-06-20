export class CapitalFlowRecord {
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
    inExType:string;
    inExCategoryId:number;
    remark:string;
}