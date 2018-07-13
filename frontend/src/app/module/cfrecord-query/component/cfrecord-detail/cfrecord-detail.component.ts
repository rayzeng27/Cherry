import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EnumInExType } from '../../../../enum/inex-type.enum';
import { CapitalFlowRecordViewObject } from '../../../../entity/capital-flow-record.entity';
import { CfRecordQueryService } from '../../service/cfrecord-query.service';

@Component({
  selector: 'app-root',
  templateUrl: './cfrecord-detail.component.html',
  styleUrls: ['./cfrecord-detail.component.css']
})
export class CfRecordDetailComponent implements OnInit
{
  // 此变量是为了能在html里引用枚举
  EnumInExType = EnumInExType;

  constructor(
    private route: ActivatedRoute,
    private cfRecordQueryService: CfRecordQueryService) 
  {
  }

  cfRecordVO: CapitalFlowRecordViewObject;

  ngOnInit() 
  {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cfRecordVO = this.cfRecordQueryService.getCfRecord(id);

    if (null == this.cfRecordVO)
    {
      throw new Error("Capital-Flow-Record not found.");
    }

    // this.cfRecordVO = new CapitalFlowRecordViewObject();
    // this.cfRecordVO.id = 2;
    // this.cfRecordVO.groupId = 0;
    // this.cfRecordVO.groupFlag = false;
    // this.cfRecordVO.recordDateTime = new Date();
    // this.cfRecordVO.lastOperDateTime = "201806201913";
    // this.cfRecordVO.flowOutAccountId = 145;
    // this.cfRecordVO.flowOutOperationId = "cash";
    // this.cfRecordVO.flowInAccountId = 245;
    // this.cfRecordVO.flowInOperationId = "creditcard";
    // this.cfRecordVO.localMoney = 12220;
    // this.cfRecordVO.foreignMoney = 12220;
    // this.cfRecordVO.foreignCurrencyId = 0;
    // this.cfRecordVO.exchangeRate = 1;
    // this.cfRecordVO.ownerId = 2;
    // this.cfRecordVO.inExType = EnumInExType.NONE;
    // this.cfRecordVO.inExCategoryId = 0;
    // this.cfRecordVO.remark = "很长很长腿长的备注，sdf,ef,wef,ewf,wef,ewf,ew,few,长得没有人性呀3333333333333";

    // this.cfRecordVO.flowOutAccountName = "[小明]现金账户";
    // this.cfRecordVO.flowInAccountName = "[小明]招行白金信用卡";
    // this.cfRecordVO.inExCategoryName = "";
    // this.cfRecordVO.ownerName = "小李";
    // this.cfRecordVO.tagNames = ["游泳", "滑雪", "爬山"];
  }
}
