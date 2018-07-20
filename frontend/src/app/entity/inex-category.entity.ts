import { EnumInExType } from "../enum/inex-type.enum";

export class InExCategory
{
    id : number;
    groupId : number;
    name : string;
    inExType : EnumInExType;
    pinyin : string;
    acronym : string;
}

export class InExGroup
{
    id : number;
    name : string;
    inExType : EnumInExType;
    categories : InExCategory[];
}