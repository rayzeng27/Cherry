import { Component, OnInit } from '@angular/core';

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

    constructor(private accountService : AccountService) 
    {
    }

    ngOnInit() 
    {
        this.accountGroups = this.accountService.getAccountGroups();
    }
}