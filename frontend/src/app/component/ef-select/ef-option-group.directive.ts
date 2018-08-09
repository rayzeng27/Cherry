import { Directive, Input, ContentChildren, QueryList } from '@angular/core';
import { EfOptionDirective } from './ef-option.directive';

@Directive({
    selector: 'ef-option-group'
})
export class EfOptionGroupDirective
{
    @Input() efLabel: string;

    @ContentChildren(EfOptionDirective) 
    options : QueryList<EfOptionDirective>;
}