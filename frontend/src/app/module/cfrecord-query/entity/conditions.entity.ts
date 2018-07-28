import { EnumInExType } from "../../../enum/inex-type.enum";
import { CapitalFlowRecordViewObject } from "../../../entity/capital-flow-record.entity";

export class MoneyCondition
{
    rangeType : EnumMoneyConditionRangeType;
    upperLimit : number;
    lowerLimit : number;
}

export class AccountCondition
{
    accIdSeries : string;
}

export class InExCategoryCondition
{
    inExType : EnumInExType;
    categoryIdSeries : string;
}

export class TagCondition
{
    tagIdSeries : string;
}

export class OwnerCondition
{
    ownerIdSeries : string;
}

export class RecordTimeCondition
{
    startDateTime : Date;
    endDateTime : Date;
}

export class RemarkCondition
{
    keyword : string;
}

export enum EnumMoneyConditionRangeType
{
    /** 上限 */
    UPPER = "UPPER",

    /** 定额 */
    QUOTA = "QUOTA",

    /** 下限 */
    LOWER = "LOWER",

    /** 范围 */
    RANGE = "RANGE"
}

export class ConditionFormData
{
    moneyCondition :    { enable : false, lowerLimit : 0, upperLimit : 0 };
    inExCondition :     { enable : false, inExType : EnumInExType.EXPENSES, inExCategories : number[]};
    accountCondition :  { enable : false, accounts : number[] };
    tagCondition :      { enable : false, tags : number[] };
    dateTimeCondition : { enable : false, startDate : null, endDate : null };
    ownerCondition :    { enable : false, owners : number[] };
    remarkCondition :   { enable : false, remark : "" }
}

export class QueryRequest
{
    countPerPage : number = 10;
    currentPageNum : number = 1;

    moneyCondition : MoneyCondition;
    accountCondition : AccountCondition;
    inExCategoryCondition : InExCategoryCondition;
    tagCondition : TagCondition;
    ownerCondition : OwnerCondition;
    recordTimeCondition : RecordTimeCondition;
    remarkCondition : RemarkCondition;
}

export class QueryResponse
{
    totalCount : number = 0;
    startIndex : number = 0;
    endIndex : number = 0;
    countPerPage : number = 0;
    currentPageNum : number = 0;
    totalPageCount : number = 0;

    previousPageEnable : boolean = false;
    nextPageEnable : boolean = false;

    cfRecordList : CapitalFlowRecordViewObject[] = [];
}