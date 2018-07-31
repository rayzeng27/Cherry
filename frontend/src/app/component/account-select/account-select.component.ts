import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AccountService } from '../../service/account.service';
import { Account } from '../../entity/account.entity';
import { toBoolean } from 'ng-zorro-antd/src/core/util/convert';

@Component({
  selector: 'ef-account-select',
  providers : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountSelectComponent),
      multi      : true
    }
  ],
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit, ControlValueAccessor
{
    private _disabled = false;

    onChange: (value: number[]) => void = () => {};

    groups : InnerAccountGroup[] = []; 
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
        if (this.efDisabled)
        {
            return;
        }

        this.modalSelectedAccounts = [];

        let accountIds : number[] = [];
        this.selectedAccounts.forEach(account => {accountIds.push(account.id)});

        this.groups.forEach(group => {
            group.accounts.forEach(account => {
                account.selected = accountIds.includes(account.id);
                account.selected && this.modalSelectedAccounts.push(account);
            });
        });

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

    deleteTag(account : SelectableAccount, i : number)
    {
        account.selected = false;
        this.modalSelectedAccounts.splice(i, 1);
    }

    deselectAll()
    {
        this.modalSelectedAccounts.forEach(account => {account.selected = false;});
        this.modalSelectedAccounts = [];
    }
    
    handleOk(): void 
    {
        this.selectedAccounts = [];
        this.modalVisible = false;

        let accountIds : number[] = [];
        this.modalSelectedAccounts.forEach(account => {
            this.selectedAccounts.push(Object.assign({}, account));
            accountIds.push(account.id);
        });

        this.onChange(accountIds);
    }
    
    handleCancel(): void 
    {
        this.modalVisible = false;
    }

    writeValue(accountIds: number[]): void
    {
        this.selectedAccounts.forEach(account => {account.selected = false});
        this.selectedAccounts = [];

        if (null == accountIds || 0 == accountIds.length)
        {
            return;
        }

        this.groups.forEach(group => {
            group.accounts.forEach(account => {
                if (accountIds.includes(account.id))
                {
                    account.selected = true;
                    this.selectedAccounts.push(account);
                }
            });
        });
    }

    registerOnChange(fn: (value: number[]) => void): void
    {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void
    {
    }

    setDisabledState?(isDisabled : boolean): void
    {
        this._disabled = isDisabled;
    }

    @Input()
    set efDisabled(value: boolean) 
    {
      this._disabled = toBoolean(value);
    }
  
    get efDisabled(): boolean 
    {
      return this._disabled;
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