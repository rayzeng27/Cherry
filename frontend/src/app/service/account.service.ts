import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account, AccountGroup } from '../entity/account.entity';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class AccountService
{
    private groupMap : Map<number, AccountGroup> = new Map();
    private accountMap : Map<number, Account> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
       return zip(this.http.get<Account[]>("ef/account/list"), 
                  this.http.get<AccountGroup[]>("ef/account/groups"))
                .pipe(map(result => {
                    let accounts = result[0];
                    let groups = result[1];
    
                    groups.forEach(group => {
                        this.groupMap.set(group.id, group);
                    });
    
                    accounts.forEach(account => {
                        this.accountMap.set(account.id, account);
    
                        // add account to group
                        if (account.groupId > 0)
                        {
                            let group = this.groupMap.get(account.groupId);
                            if (null == group.accounts)
                            {
                                group.accounts = [];
                            }
                            group.accounts.push(account);
                        }
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

    public getAccountGroups() : AccountGroup[]
    {
        let groups = Array.from(this.groupMap.values());
        return groups;
    }
}