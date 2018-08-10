import { Directive, Input } from '@angular/core';
import { Searchable } from '../../entity/searchable.entity';

@Directive({
  selector: 'ef-option'
})
export class EfOptionDirective
{
    @Input() efLabel: string;
    @Input() efValue: any;
    @Input() efSearchable: Searchable;

    selected : boolean = false;
}