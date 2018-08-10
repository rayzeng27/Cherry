import { EnumInExType } from "../enum/inex-type.enum";
import { Searchable } from "./searchable.entity";

export class InExCategory extends Searchable
{
    id : number;
    groupId : number;
    inExType : EnumInExType;
}

export class InExGroup
{
    id : number;
    name : string;
    inExType : EnumInExType;
    categories : InExCategory[];
}