import { Component, OnInit } from '@angular/core';
import { CapitalFlowRecordViewObject } from '../../../../entity/capital-flow-record.entity';
import { CfRecordQueryService } from '../../service/cfrecord-query.service';
import { EnumInExType } from '../../../../enum/inex-type.enum';

@Component({
  templateUrl: './cfrecord-query.component.html',
  styleUrls: ['./cfrecord-query.component.css']
})
export class CfRcordQueryComponent implements OnInit
{
  // 此变量是为了能在html里引用枚举
  EnumInExType = EnumInExType;

  cfRecordVOs: CapitalFlowRecordViewObject[];

  constructor(private cfRecordQueryService: CfRecordQueryService) 
  {
  }

  ngOnInit() 
  {
    this.cfRecordQueryService.query().subscribe(cfRecordVOs => {
      this.cfRecordVOs = cfRecordVOs;
    });
  }
}
