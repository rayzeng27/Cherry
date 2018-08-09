import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from 'ng-zorro-antd/src/core/util/convert';

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
    private _disabled = false;

    private onChange: (value: number[]) => void = () => {};

    ngOnInit(): void 
    {
        throw new Error("Method not implemented.");
    }

    writeValue(accountIds: number[]): void
    {
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