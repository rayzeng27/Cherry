import { Component, OnInit } from '@angular/core';
import { CapitalFlowRecordViewObject } from '../../entity/CapitalFlowRecord.entity';
import { CapitalFlowRecordService } from '../../service/CapitalFlowRecord.service';
import { EnumInExType } from '../../enum/InExType.enum';

@Component({
  templateUrl: './cfrecord-query.component.html',
  styleUrls: ['./cfrecord-query.component.css']
})
export class CfRcordQueryComponent implements OnInit
{
  // 此变量是为了能在html里引用枚举
  EnumInExType = EnumInExType;

  cfRecordVOs: CapitalFlowRecordViewObject[];

  constructor(private cfRecordService: CapitalFlowRecordService) 
  {
  }

  ngOnInit() 
  {
    this.cfRecordService.query().subscribe(cfRecordVOs => {
      this.cfRecordVOs = cfRecordVOs;
    });
  }
}
