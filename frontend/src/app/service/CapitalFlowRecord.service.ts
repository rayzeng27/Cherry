import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CapitalFlowRecordViewObject } from '../entity/CapitalFlowRecord.entity';
import { EnumInExType } from '../enum/InExType.enum';

@Injectable()
export class CapitalFlowRecordService
{
  constructor(private http: HttpClient) 
  {
  }

  public query() : Observable<CapitalFlowRecordViewObject[]>
  {
    return this.http.get<CapitalFlowRecordViewObject[]>("localhost:8221/cfrecord")
    .pipe(
      tap(cfRecordVOs => console.log("Query cfRecord succuess.")),
      catchError(this.handleError<CapitalFlowRecordViewObject[]>('query', []))
    );

    // let cfRecordVOs : CapitalFlowRecordViewObject[] = [];
    // cfRecordVOs[0] = new CapitalFlowRecordViewObject();
    // cfRecordVOs[0].id = 1;
    // cfRecordVOs[0].groupId = 0;
    // cfRecordVOs[0].groupFlag = false;
    // cfRecordVOs[0].recordDateTime = "201806201513";
    // cfRecordVOs[0].lastOperDateTime = "201806201513";
    // cfRecordVOs[0].flowOutAccountId = 0;
    // cfRecordVOs[0].flowOutOperationId = "";
    // cfRecordVOs[0].flowInAccountId = 123456;
    // cfRecordVOs[0].flowInOperationId = "depetIncome";
    // cfRecordVOs[0].localMoney = 123123.12;
    // cfRecordVOs[0].foreignMoney = 123123.12;
    // cfRecordVOs[0].foreignCurrencyId = 0;
    // cfRecordVOs[0].exchangeRate = 1;
    // cfRecordVOs[0].ownerId = 1;
    // cfRecordVOs[0].inExType = EnumInExType.INCOME;
    // cfRecordVOs[0].inExCategoryId = 123;
    // cfRecordVOs[0].remark = "很长很长腿长的备注，长得没有人性呀111111111111";

    // cfRecordVOs[0].flowOutAccountName = "";
    // cfRecordVOs[0].flowInAccountName = "[小明]中国银行卡";
    // cfRecordVOs[0].inExCategoryName = "薪水";
    // cfRecordVOs[0].ownerName = "小明";
    // cfRecordVOs[0].tagsName = "";
    
    // cfRecordVOs[1] = new CapitalFlowRecordViewObject();
    // cfRecordVOs[1].id = 2;
    // cfRecordVOs[1].groupId = 0;
    // cfRecordVOs[1].groupFlag = false;
    // cfRecordVOs[1].recordDateTime = "201806201913";
    // cfRecordVOs[1].lastOperDateTime = "201806201913";
    // cfRecordVOs[1].flowOutAccountId = 111;
    // cfRecordVOs[1].flowOutOperationId = "creditcard";
    // cfRecordVOs[1].flowInAccountId = 0;
    // cfRecordVOs[1].flowInOperationId = "creditcard";
    // cfRecordVOs[1].localMoney = 130;
    // cfRecordVOs[1].foreignMoney = 130;
    // cfRecordVOs[1].foreignCurrencyId = 0;
    // cfRecordVOs[1].exchangeRate = 1;
    // cfRecordVOs[1].ownerId = 1;
    // cfRecordVOs[1].inExType = EnumInExType.EXPENSES;
    // cfRecordVOs[1].inExCategoryId = 222;
    // cfRecordVOs[1].remark = "很长很长腿长的备注，长得没有人性呀2222222222222";
    
    // cfRecordVOs[1].flowOutAccountName = "[小明]加油卡";
    // cfRecordVOs[1].flowInAccountName = "";
    // cfRecordVOs[1].inExCategoryName = "加油";
    // cfRecordVOs[1].ownerName = "小明";
    // cfRecordVOs[1].tagsName = "旅游，昆明，三亚";

    // cfRecordVOs[2] = new CapitalFlowRecordViewObject();
    // cfRecordVOs[2].id = 2;
    // cfRecordVOs[2].groupId = 0;
    // cfRecordVOs[2].groupFlag = false;
    // cfRecordVOs[2].recordDateTime = "201806201913";
    // cfRecordVOs[2].lastOperDateTime = "201806201913";
    // cfRecordVOs[2].flowOutAccountId = 145;
    // cfRecordVOs[2].flowOutOperationId = "cash";
    // cfRecordVOs[2].flowInAccountId = 245;
    // cfRecordVOs[2].flowInOperationId = "creditcard";
    // cfRecordVOs[2].localMoney = 12220;
    // cfRecordVOs[2].foreignMoney = 12220;
    // cfRecordVOs[2].foreignCurrencyId = 0;
    // cfRecordVOs[2].exchangeRate = 1;
    // cfRecordVOs[2].ownerId = 2;
    // cfRecordVOs[2].inExType = EnumInExType.NONE;
    // cfRecordVOs[2].inExCategoryId = 0;
    // cfRecordVOs[2].remark = "很长很长腿长的备注，长得没有人性呀3333333333333";
    
    // cfRecordVOs[2].flowOutAccountName = "[小明]现金账户";
    // cfRecordVOs[2].flowInAccountName = "[小明]招行白金信用卡";
    // cfRecordVOs[2].inExCategoryName = "";
    // cfRecordVOs[2].ownerName = "小李";
    // cfRecordVOs[2].tagsName = "";

    // return cfRecordVOs;
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}