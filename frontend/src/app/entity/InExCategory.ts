import { EnumInExType } from "../enum/EnumInExType";

export class InExCategory
{
    id:number;
    groupId:number;
    name:string;
    inExType:EnumInExType;
    autoIndexEnable:boolean;
    pinyin:string;
    acronym:string;
    createDateTime:string;
    lastOperDateTime:string;
    remark:string;
}