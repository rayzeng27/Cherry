import { EnumInExType } from "../enum/inex-type.enum";
import { EnumMoneyConditionRangeType } from "../enum/money-condition-range-type.enum";

export class MoneyCondition
{
    type = "Money";
    rangeType : EnumMoneyConditionRangeType;
    upperLimit : number;
    lowerLimit : number;
}

export class AccountCondition
{
    type = "Account";
}

export class InExCategoryCondition
{
    type = "InEx_Category";
    inExType : EnumInExType;
    categoryIds : number[];
}

export class TagCondition
{
    type = "Tag";
    tagIds : number[];
}

export class OwnerCondition
{
    type = "Owner";
    ownerIds : number[];
}

export class RecordTimeCondition
{
    type = "Record_Time";
    startDateTime : Date;
    endDateTime : Date;
}

export class RemarkCondition
{
    type = "Remark";
    keyword : string;
}