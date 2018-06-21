import { Injectable } from '@angular/core';
import { CapitalFlowRecord } from '../entity/CapitalFlowRecord';
import { EnumInExType } from '../enum/EnumInExType';

@Injectable()
export class CapitalFlowRecordService
{
  query():CapitalFlowRecord[]
  {
    let cfRecords : CapitalFlowRecord[] = [];
    cfRecords[0] = new CapitalFlowRecord();
    cfRecords[0].id = 1;
    cfRecords[0].groupId = 0;
    cfRecords[0].groupFlag = false;
    cfRecords[0].recordDateTime = "201806201513";
    cfRecords[0].lastOperDateTime = "201806201513";
    cfRecords[0].flowOutAccountId = 1;
    cfRecords[0].flowOutOperationId = "cash";
    cfRecords[0].flowInAccountId = 2;
    cfRecords[0].flowInOperationId = "cash";
    cfRecords[0].localMoney = 123.12;
    cfRecords[0].foreignMoney = 123.12;
    cfRecords[0].foreignCurrencyId = 0;
    cfRecords[0].exchangeRate = 1;
    cfRecords[0].ownerId = 0;
    cfRecords[0].inExType = EnumInExType.INCOME;
    cfRecords[0].inExCategoryId = 123;
    cfRecords[0].remark = "注释1";
    
    cfRecords[1] = new CapitalFlowRecord();
    cfRecords[1].id = 2;
    cfRecords[1].groupId = 0;
    cfRecords[1].groupFlag = false;
    cfRecords[1].recordDateTime = "201806201913";
    cfRecords[1].lastOperDateTime = "201806201913";
    cfRecords[1].flowOutAccountId = 1;
    cfRecords[1].flowOutOperationId = "creditcard";
    cfRecords[1].flowInAccountId = 2;
    cfRecords[1].flowInOperationId = "creditcard";
    cfRecords[1].localMoney = 13;
    cfRecords[1].foreignMoney = 13;
    cfRecords[1].foreignCurrencyId = 0;
    cfRecords[1].exchangeRate = 1;
    cfRecords[1].ownerId = 0;
    cfRecords[1].inExType = EnumInExType.EXPENSES;
    cfRecords[1].inExCategoryId = 222;
    cfRecords[1].remark = "注释2";
    
    return cfRecords;
  }
}