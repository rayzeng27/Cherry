import { Component, OnInit, forwardRef, Input, ContentChildren, QueryList, Pipe, PipeTransform, AfterContentInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { toBoolean } from 'ng-zorro-antd/src/core/util/convert';

import { EfOptionGroupDirective } from './ef-option-group.directive';
import { EfOptionDirective } from './ef-option.directive';
import { Searchable } from '../../entity/searchable.entity';

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
export class EfSelectComponent implements OnInit, AfterContentInit, ControlValueAccessor
{
    @ContentChildren(EfOptionGroupDirective)
    optionGroups : QueryList<EfOptionGroupDirective>;

    @ContentChildren(EfOptionDirective)
    options : QueryList<EfOptionDirective>;

    @Input()
    modalTitle : string = "Select";

    private _disabled = false;
    private onChange: (values : any[]) => void = () => {};
    private _initValues = null;

    searchSubject = new Subject<string>();
    searchKeywrod : string = '';

    modalVisible = false;

    selectedOptions : InnerOption[] = [];
    modalSelectedOptions : EfOptionDirective[] = [];

    ngOnInit(): void
    {
        // delay 400 milliseconds to prevent search frequently
        this.searchSubject.pipe(debounceTime(400)).subscribe(keyword => this.searchKeywrod = keyword.trim().toLowerCase());
    }

    ngAfterContentInit(): void
    {
        // when calling writeValue() first time, contentChildren 'optionGroups' doesn't exist yet, so call writeValue() again here.
        this._initValues && this.writeValue(this._initValues);
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

        this.options.forEach(option => {
            option.selected = values.includes(option.efValue);
            option.selected && this.modalSelectedOptions.push(option);
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

    writeValue(values: any[]): void
    {
        if (null == this.optionGroups)
        {
            // ContentChildren 'optionGroups' doesn't exist yet, delay calling in method ngAfterContentInit()
            this._initValues = values;
            return;
        }
        
        this.selectedOptions = [];

        if (null == values || 0 == values.length)
        {
            return;
        }

        this.optionGroups.forEach(group => {
            group.options.forEach(option => {
                if (values.includes(option.efValue))
                {
                    this.selectedOptions.push({label : option.efLabel, value : option.efValue});
                }
            });
        });

        this.options.forEach(option => {
            if (values.includes(option.efValue))
            {
                this.selectedOptions.push({label : option.efLabel, value : option.efValue});
            }
        });
    }

    registerOnChange(fn: (values : any[]) => void): void
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

let filterFn = function(keyword : string, searchable : Searchable) : boolean
{
    return searchable.name.toLowerCase().includes(keyword)
        || searchable.pinyin.toLowerCase().includes(keyword)
        || searchable.acronym.toLowerCase().includes(keyword);
};

@Pipe({ name: 'efOptionFilter' })
export class EfOptionPipe implements PipeTransform
{
    transform(options: EfOptionDirective[], keyword: string): EfOptionDirective[]
    {
        return options.filter(o => filterFn(keyword, o.efSearchable));
    }
}

@Pipe({ name: 'efOptionGroupFilter' })
export class EfOptionGroupPipe implements PipeTransform
{
    transform(groups: EfOptionGroupDirective[], keyword: string): EfOptionGroupDirective[]
    {
        return groups.filter(g => { return g.options.some(o => filterFn(keyword, o.efSearchable)); });
    }
}