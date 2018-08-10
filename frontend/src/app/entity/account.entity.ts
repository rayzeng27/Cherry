import { Searchable } from "./searchable.entity";

export class Account extends Searchable
{
    id : number;
    groupId : number;
    issuerId : number;
    ownerId : number;
    status : string;
}

export class AccountGroup
{
    id : number;
    name : string;
    accounts : Account[];
}