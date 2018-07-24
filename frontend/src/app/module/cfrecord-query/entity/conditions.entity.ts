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
    accIdSet : number[];
}

export class InExCategoryCondition
{
    inExType : EnumInExType;
    categoryIdSet : number[];
}

export class TagCondition
{
    tagIdSet : number[];
}

export class OwnerCondition
{
    ownerIdSet : number[];
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
    countPerPage : number = 0;
    currentPageNum : number = 0;
    totalPageCount : number = 0;

    previousPageEnable : boolean = false;
    nextPageEnable : boolean = false;

    cfRecordList : CapitalFlowRecordViewObject[] = [];
}