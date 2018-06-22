import { Component, OnInit } from '@angular/core';
import { CapitalFlowRecordViewObject } from './entity/CapitalFlowRecord.entity';
import { CapitalFlowRecordService } from './service/CapitalFlowRecord.service';
import { EnumInExType } from './enum/InExType.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  // 此变量是为了能在html里引用枚举
  EnumInExType = EnumInExType;

  cfRecordVOs: CapitalFlowRecordViewObject[];

  constructor(private cfRecordService: CapitalFlowRecordService) 
  {
  }

  ngOnInit() 
  {
    this.cfRecordVOs = this.cfRecordService.query();
  }
}
