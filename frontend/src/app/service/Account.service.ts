import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../entity/Account.entity';

@Injectable()
export class AccountService
{
    private map : Map<number, Account> = new Map();

    constructor(private http: HttpClient) 
    {
        this.http.get<Account[]>("ef/accounts")
        .subscribe(accounts => accounts.forEach(account => this.map.set(account.id, account)));
    }
}