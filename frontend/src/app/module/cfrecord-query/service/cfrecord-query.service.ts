import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CapitalFlowRecordViewObject } from '../../../entity/capital-flow-record.entity';
import { EnumInExType } from '../../../enum/inex-type.enum';
import { AccountService } from '../../../service/account.service';
import { InExCategoryService } from '../../../service/inex-category.service';
import { PersonService } from '../../../service/person.service';
import { TagService } from '../../../service/tag.service';

@Injectable()
export class CfRecordQueryService
{
    private cfRecordMap : Map<number, CapitalFlowRecordViewObject> = new Map();

    constructor(private http: HttpClient,
                private accountService : AccountService,
                private inExCategoryService : InExCategoryService,
                private personService : PersonService,
                private tagService : TagService)
    {
    }

    public query() : Observable<CapitalFlowRecordViewObject[]>
    {
        return this.http.get<CapitalFlowRecordViewObject[]>("ef/cfrecord/list")
        .pipe(
            map(cfRecordVOs => {
                cfRecordVOs.forEach(cfRecordVO => this.fillingInformation(cfRecordVO)); 
                return cfRecordVOs;
            }),
            catchError(this.handleError<CapitalFlowRecordViewObject[]>('query', []))
        );

        // let cfRecordVOs : CapitalFlowRecordViewObject[] = [];
        // cfRecordVOs[0] = new CapitalFlowRecordViewObject();
        // cfRecordVOs[0].id = 1;
        // cfRecordVOs[0].recordDateTime = new Date();
        // cfRecordVOs[0].flowOutAccountId = 0;
        // cfRecordVOs[0].flowOutOperationId = "";
        // cfRecordVOs[0].flowInAccountId = 123456;
        // cfRecordVOs[0].flowInOperationId = "depetIncome";
        // cfRecordVOs[0].localMoney = 123123.12;
        // cfRecordVOs[0].ownerId = 1;
        // cfRecordVOs[0].inExType = EnumInExType.INCOME;
        // cfRecordVOs[0].inExCategoryId = 123;
        // cfRecordVOs[0].remark = "很长很长腿长的备注，长得没有人性呀111111111111";

        // cfRecordVOs[0].flowOutAccountName = "";
        // cfRecordVOs[0].flowInAccountName = "[小明]中国银行卡";
        // cfRecordVOs[0].inExCategoryName = "薪水";
        // cfRecordVOs[0].ownerName = "小明";

        // cfRecordVOs[1] = new CapitalFlowRecordViewObject();
        // cfRecordVOs[1].id = 2;
        // cfRecordVOs[1].recordDateTime = new Date();
        // cfRecordVOs[1].flowOutAccountId = 111;
        // cfRecordVOs[1].flowOutOperationId = "creditcard";
        // cfRecordVOs[1].flowInAccountId = 0;
        // cfRecordVOs[1].flowInOperationId = "creditcard";
        // cfRecordVOs[1].localMoney = 130;
        // cfRecordVOs[1].ownerId = 1;
        // cfRecordVOs[1].inExType = EnumInExType.EXPENSES;
        // cfRecordVOs[1].inExCategoryId = 222;
        // cfRecordVOs[1].remark = "很长很长腿长的备注，长得没有人性呀2222222222222";

        // cfRecordVOs[1].flowOutAccountName = "[小明]加油卡";
        // cfRecordVOs[1].flowInAccountName = "";
        // cfRecordVOs[1].inExCategoryName = "加油";
        // cfRecordVOs[1].ownerName = "小明";
        // cfRecordVOs[1].tagNames = ["旅游", "昆明", "三亚"];

        // cfRecordVOs[2] = new CapitalFlowRecordViewObject();
        // cfRecordVOs[2].id = 3;
        // cfRecordVOs[2].recordDateTime = new Date();
        // cfRecordVOs[2].flowOutAccountId = 145;
        // cfRecordVOs[2].flowOutOperationId = "cash";
        // cfRecordVOs[2].flowInAccountId = 245;
        // cfRecordVOs[2].flowInOperationId = "creditcard";
        // cfRecordVOs[2].localMoney = 12220;
        // cfRecordVOs[2].ownerId = 2;
        // cfRecordVOs[2].inExType = EnumInExType.NONE;
        // cfRecordVOs[2].inExCategoryId = 0;
        // cfRecordVOs[2].remark = "很长很长腿长的备注，长得没有人性呀3333333333333";

        // cfRecordVOs[2].flowOutAccountName = "[小明]现金账户";
        // cfRecordVOs[2].flowInAccountName = "[小明]招行白金信用卡";
        // cfRecordVOs[2].inExCategoryName = "";
        // cfRecordVOs[2].ownerName = "小李";

        // this.cfRecordMap.set(cfRecordVOs[0].id, cfRecordVOs[0]);
        // this.cfRecordMap.set(cfRecordVOs[1].id, cfRecordVOs[1]);
        // this.cfRecordMap.set(cfRecordVOs[2].id, cfRecordVOs[2]);

        // return of(cfRecordVOs);
    }

    getCfRecord(id: number) : CapitalFlowRecordViewObject 
    {
        return this.cfRecordMap.get(id);
    }

    /**
     * 完善cfRecordVO的信息
     * @param cfRecordVO
     */
    private fillingInformation(cfRecordVO : CapitalFlowRecordViewObject) : void
    {
        // account and inExCategory
        switch(cfRecordVO.inExType)
        {
            case EnumInExType.INCOME:
            {
                let account = this.accountService.getAccount(cfRecordVO.flowInAccountId);
                cfRecordVO.flowInAccountName = account.name;

                let inExCategory = this.inExCategoryService.getInExCategory(EnumInExType.INCOME, cfRecordVO.inExCategoryId);
                cfRecordVO.inExCategoryName = inExCategory.name;
                break;
            }
            case EnumInExType.EXPENSES:
            {
                let account = this.accountService.getAccount(cfRecordVO.flowOutAccountId);
                cfRecordVO.flowOutAccountName = account.name;
                
                let inExCategory = this.inExCategoryService.getInExCategory(EnumInExType.EXPENSES, cfRecordVO.inExCategoryId);
                cfRecordVO.inExCategoryName = inExCategory.name;
                break;
            }
            case EnumInExType.NONE:
            {
                let inAccount = this.accountService.getAccount(cfRecordVO.flowInAccountId);
                let outAccount = this.accountService.getAccount(cfRecordVO.flowOutAccountId);

                cfRecordVO.flowInAccountName = inAccount.name;
                cfRecordVO.flowOutAccountName = outAccount.name;
                break;
            }
        }

        // owner
        if (cfRecordVO.ownerId > 0)
        {
            let person = this.personService.getPerson(cfRecordVO.ownerId);
            cfRecordVO.ownerName = person.name;
        }

        // tag 
        if (cfRecordVO.tagIdList.length > 0)
        {
            cfRecordVO.tagNames = [];

            cfRecordVO.tagIdList.forEach((id, index) => {
                let tag = this.tagService.getTag(id);
                cfRecordVO.tagNames[index] = tag.name;
            });
        }

        this.cfRecordMap.set(cfRecordVO.id, cfRecordVO);
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