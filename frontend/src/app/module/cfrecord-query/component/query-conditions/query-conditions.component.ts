import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { EnumInExType } from '../../../../enum/inex-type.enum';
import { AccountService } from '../../../../service/account.service';
import { AccountGroup } from '../../../../entity/account.entity';

@Component({
  templateUrl: './query-conditions.component.html',
  styleUrls: ['./query-conditions.component.css']
})
export class QueryConditionsComponent implements OnInit
{
    // 此变量是为了能在html里引用枚举
    private EnumInExType = EnumInExType;

    private accountGroups : AccountGroup[] = [];

    private conditionForm : FormGroup;

    constructor(private fb : FormBuilder,
                private accountService : AccountService) 
    {
    }

    ngOnInit() 
    {
        this.conditionForm = this.fb.group({
            moneyCondition : this.fb.group({
                enable : false,
                lowerLimit : 0,
                upperLimit : 0
            })
        });

        this.accountGroups = this.accountService.getAccountGroups();
    }
}