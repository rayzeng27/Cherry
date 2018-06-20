import { Component, OnInit } from '@angular/core';
import { CapitalFlowRecord } from './entity/CapitalFlowRecord';
import { CapitalFlowRecordService } from './service/CapitalFlowRecord.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  cfRecords: CapitalFlowRecord[];

  constructor(private cfRecordService: CapitalFlowRecordService) 
  {
  }

  ngOnInit() 
  {
    this.cfRecords = this.cfRecordService.query();
  }
}
