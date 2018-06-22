import { EnumInExType } from "../enum/InExType.enum";

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