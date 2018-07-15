export class Account
{
    id : number;
    groupId : number;
    issuerId : number;
    ownerId : number;
    name : string;
    status : string;
    pinyin : string;
    acronym : string;
}

export class AccountGroup
{
    id : number;
    name : string;
    accounts : Account[];
}