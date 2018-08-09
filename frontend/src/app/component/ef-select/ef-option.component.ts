import { Component, Input } from '@angular/core';

@Component({
  selector: 'ef-option',
  templateUrl: './ef-option.component.html',
  styleUrls:  ['./ef-option.component.css']
})
export class EfOptionComponent
{
    @Input() label: string;

    @Input() value: any;
}