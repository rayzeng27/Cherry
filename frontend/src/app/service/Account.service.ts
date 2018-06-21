import { Injectable } from '@angular/core';
import { Account } from '../entity/Account';

@Injectable()
export class AccountService
{
    public getAccountName (accountId : number) : string
    {
        return "测试账户";
    }
}