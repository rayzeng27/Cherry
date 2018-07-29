import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Account } from '../../entity/account.entity';

@Component({
  selector: 'ef-account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit, ControlValueAccessor
{
    groups : InnerAccountGroup[] = []; 
    accountIds : number[] = [];
    modalVisible = false;

    selectedAccounts : SelectableAccount[] = [];
    modalSelectedAccounts : SelectableAccount[] = [];

    constructor(private accountService: AccountService) 
    {
    }

    ngOnInit() 
    {
        let accountGroups = this.accountService.getAccountGroups();
        accountGroups.forEach(accountGroup => {
            if (accountGroup.accounts.length == 0)
            {
                return;
            }

            let group : InnerAccountGroup = {name:accountGroup.name, accounts:[]};
            this.groups.push(group);

            accountGroup.accounts.forEach(account => {
                let selectableAccount : SelectableAccount = Object.assign({selected:false}, account);
                group.accounts.push(selectableAccount);
            });
        });
    }

    showModal(): void 
    {
        this.modalSelectedAccounts = this.selectedAccounts;
        this.modalVisible = true;
    }

    clickAccount(account : SelectableAccount)
    {
        account.selected = !account.selected;

        if (account.selected)
        {
            this.modalSelectedAccounts.push(account);
        }
        else
        {
            for (let index = 0; index < this.modalSelectedAccounts.length; index++) 
            {
                const tmpAccount = this.modalSelectedAccounts[index];
                if (tmpAccount == account)
                {
                    this.modalSelectedAccounts.splice(index, 1);
                    break;
                }
            }
        }
    }
    
    handleOk(): void 
    {
        this.selectedAccounts = this.modalSelectedAccounts;
        this.modalVisible = false;
    }
    
    handleCancel(): void 
    {
        this.modalVisible = false;
    }

    writeValue(obj: any): void
    {
        throw new Error("Method not implemented.");
    }

    registerOnChange(fn: any): void
    {
        throw new Error("Method not implemented.");
    }

    registerOnTouched(fn: any): void
    {
        throw new Error("Method not implemented.");
    }

    setDisabledState?(isDisabled: boolean): void
    {
        throw new Error("Method not implemented.");
    }
}

class InnerAccountGroup
{
    name : string;
    accounts : SelectableAccount[];
}

class SelectableAccount extends Account
{
    selected : boolean;
}