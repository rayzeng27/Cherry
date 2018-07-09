import { EnumInExType } from "../enum/inex-type.enum";

export class MoneyCondition
{
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