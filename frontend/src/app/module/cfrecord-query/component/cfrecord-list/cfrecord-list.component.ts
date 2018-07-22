import { Component, OnInit } from '@angular/core';
import { CapitalFlowRecordViewObject } from '../../../../entity/capital-flow-record.entity';
import { CfRecordQueryService } from '../../service/cfrecord-query.service';
import { EnumInExType } from '../../../../enum/inex-type.enum';

@Component({
    templateUrl: './cfrecord-list.component.html',
    styleUrls: ['./cfrecord-list.component.css']
})
export class CfRecordListComponent implements OnInit
{
    // 此变量是为了能在html里引用枚举
    EnumInExType = EnumInExType;

    cfRecordVOs: CapitalFlowRecordViewObject[];

    constructor(private cfRecordQueryService: CfRecordQueryService)
    {
    }

    ngOnInit()
    {
        this.cfRecordVOs = this.cfRecordQueryService.getCfRecords();
    }
}