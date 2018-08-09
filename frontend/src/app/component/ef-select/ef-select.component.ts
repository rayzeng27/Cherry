import { Component, OnInit, forwardRef, Input, ContentChildren, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { toBoolean } from 'ng-zorro-antd/src/core/util/convert';

import { EfOptionGroupDirective } from './ef-option-group.directive';
import { EfOptionDirective } from './ef-option.directive';

@Component({
  selector: 'ef-select',
  providers : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EfSelectComponent),
      multi      : true
    }
  ],
  templateUrl: './ef-select.component.html',
  styleUrls: ['./ef-select.component.css']
})
export class EfSelectComponent implements OnInit, ControlValueAccessor
{
    @ContentChildren(EfOptionGroupDirective)
    optionGroups : QueryList<EfOptionGroupDirective>;

    private _disabled = false;
    private onChange: (value: any[]) => void = () => {};

    searchSubject = new Subject<string>();

    modalVisible = false;

    selectedOptions : InnerOption[] = [];
    modalSelectedOptions : EfOptionDirective[] = [];

    ngOnInit(): void
    {
        // delay 400 milliseconds to prevent search frequently
        this.searchSubject.pipe(debounceTime(400)).subscribe(keyword => this.search(keyword));
    }

    showModal(): void
    {
        if (this.efDisabled)
        {
            return;
        }

        this.modalSelectedOptions = [];

        let values : any[] = [];
        this.selectedOptions.forEach(option => {values.push(option.value)});

        this.optionGroups.forEach(group => {
            group.options.forEach(option => {
                option.selected = values.includes(option.efValue);
                option.selected && this.modalSelectedOptions.push(option);
            });
        });


        this.modalVisible = true;
    }

    toggleOption(option : EfOptionDirective)
    {
        option.selected = !option.selected;
        if (option.selected)
        {
            this.modalSelectedOptions.push(option);
        }
        else
        {
            for (let index = 0; index < this.modalSelectedOptions.length; index++)
            {
                const tmpOption = this.modalSelectedOptions[index];
                if (tmpOption == option)
                {
                    this.modalSelectedOptions.splice(index, 1);
                    break;
                }
            }
        }
    }

    deselectOption(option : EfOptionDirective, i : number)
    {
        option.selected = false;
        this.modalSelectedOptions.splice(i, 1);
    }

    deselectAllOptions()
    {
        this.modalSelectedOptions.forEach(option => {option.selected = false;});
        this.modalSelectedOptions = [];
    }

    handleOk(): void
    {
        this.selectedOptions = [];
        this.modalVisible = false;

        let values : any[] = [];
        this.modalSelectedOptions.forEach(option => {
            this.selectedOptions.push({label : option.efLabel, value : option.efValue});
            values.push(option.efValue);
        });

        this.onChange(values);
    }

    handleCancel(): void
    {
        this.modalVisible = false;
    }

    private search(keyword : string) : void
    {
        keyword = keyword.trim().toLowerCase();
        // if (keyword.length == 0)
        // {
        //     this.filteredGroups = this.groups;
        // }
        // else
        // {
        //     this.filteredGroups = [];
        //     this.groups.forEach(group => {
        //         let filteredGroup : InnerAccountGroup;
        //         group.accounts.forEach(account => {
        //             if (account.name.toLowerCase().includes(keyword)
        //                 || account.pinyin.toLowerCase().includes(keyword)
        //                 || account.acronym.toLowerCase().includes(keyword))
        //             {
        //                 if (null == filteredGroup)
        //                 {
        //                     filteredGroup = {name:group.name, accounts:[]};
        //                 }
        //                 filteredGroup.accounts.push(account);
        //             }
        //         });

        //         filteredGroup && this.filteredGroups.push(filteredGroup);
        //     });
        // }
    }

    writeValue(accountIds: number[]): void
    {
    }

    registerOnChange(fn: (value: any[]) => void): void
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

class InnerOption
{
    label : string;
    value : any;
}