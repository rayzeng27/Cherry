import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../entity/Account.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class AccountService
{
    private accountMap : Map<number, Account> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
       return this.http.get<Account[]>("ef/account/list").pipe(
        map(accounts => {
            accounts.forEach(account => {
                this.accountMap.set(account.id, account);
            });
            
            return true;
        })
       );
    }

    public getAccount(id : number) : Account
    {
        let account = this.accountMap.get(id);

        return account;
    }
}