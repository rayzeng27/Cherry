import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CfRecordQueryService, EnumQueryStatus } from '../../service/cfrecord-query.service';
import { EnumInExType } from '../../../../enum/inex-type.enum';
import { QueryResponse } from '../../entity/conditions.entity';

@Component({
    templateUrl: './cfrecord-list.component.html',
    styleUrls: ['./cfrecord-list.component.css']
})
export class CfRecordListComponent implements OnInit, OnDestroy
{
    // 此变量是为了能在html里引用枚举
    EnumInExType = EnumInExType;

    queryResponse = new QueryResponse();

    subscription : Subscription;

    constructor(private router : Router,
                private cfRecordQueryService: CfRecordQueryService)
    {
    }

    ngOnInit()
    {
        if (EnumQueryStatus.QUERIED == this.cfRecordQueryService.getStatus())
        {
            // scenario: from 'query-cfrecords/detail' back to 'query-cfrecords/list'
            this.queryResponse = this.cfRecordQueryService.getResponse();
        }

        this.subscription = this.cfRecordQueryService.getSubject().subscribe((queryResponse)=>{this.queryResponse = queryResponse;});
    }

    ngOnDestroy()
    {
        this.subscription && this.subscription.unsubscribe();
    }

    prevPage()
    {
        this.cfRecordQueryService.prevPage();
    }

    nextPage()
    {
        this.cfRecordQueryService.nextPage();
    }

    gotoCondition()
    {
        this.router.navigate(['/query-cfrecords/conditions']);
    }
}