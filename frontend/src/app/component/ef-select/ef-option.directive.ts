import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ef-option'
})
export class EfOptionDirective
{
    @Input() efLabel: string;
    @Input() efValue: any;

    selected : boolean = false;
}