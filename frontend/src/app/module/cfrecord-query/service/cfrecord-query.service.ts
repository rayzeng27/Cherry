import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EnumInExType } from '../../../enum/inex-type.enum';
import { CapitalFlowRecordViewObject } from '../../../entity/capital-flow-record.entity';
import { AccountService } from '../../../service/account.service';
import { InExCategoryService } from '../../../service/inex-category.service';
import { PersonService } from '../../../service/person.service';
import { TagService } from '../../../service/tag.service';
import { MoneyCondition, AccountCondition, TagCondition, RecordTimeCondition, OwnerCondition, RemarkCondition, InExCategoryCondition, ConditionFormData, EnumMoneyConditionRangeType, QueryRequest, QueryResponse } from '../entity/conditions.entity';


@Injectable()
export class CfRecordQueryService
{
    private conditionFormData : ConditionFormData;

    private request : QueryRequest;

    private response : QueryResponse;

    private status = EnumQueryStatus.NOT_QUERY_YET;

    private subject = new Subject<QueryResponse>();

    private cfRecordMap : Map<number, CapitalFlowRecordViewObject> = new Map();

    constructor(private http : HttpClient,
                private accountService : AccountService,
                private inExCategoryService : InExCategoryService,
                private personService : PersonService,
                private tagService : TagService)
    {
        this.subject.subscribe(()=>{this.status = EnumQueryStatus.QUERIED;});
    }

    public nextPage() : void
    {
       let newRequest = Object.assign({}, this.request);
       newRequest.currentPageNum = this.response.currentPageNum + 1;
       this.doQuery(newRequest);
    }

    public prevPage() : void
    {
       let newRequest = Object.assign({}, this.request);
       newRequest.currentPageNum = this.response.currentPageNum - 1;
       this.doQuery(newRequest);
    }

    public getStatus(): EnumQueryStatus 
    {
        return this.status;
    }

    public getSubject() : Subject<QueryResponse>
    {
        return this.subject;
    }

    public getResponse() : QueryResponse
    {
        return this.response;
    }

    public getCfRecord(id: number) : CapitalFlowRecordViewObject
    {
        return this.cfRecordMap.get(id);
    }

    public getConditionFormData() : ConditionFormData
    {
        return this.conditionFormData;
    }

    public query(conditionFormData : ConditionFormData) : void
    {
        let request = this.generateQueryRequest(conditionFormData);
        this.conditionFormData = conditionFormData;
        this.doQuery(request);
    }

    private doQuery(request : QueryRequest) : void
    {
        this.status = EnumQueryStatus.QUERYING;
        this.http.post<QueryResponse>("ef/cfrecord/list", request)
        .pipe(
            map(response => {
                response.cfRecordList.forEach(cfRecordVO => this.fillingInformation(cfRecordVO));

                this.request = request;
                this.response = response;

                return response;
            }),
            catchError(this.handleError<QueryResponse>('query', {totalCount:0, countPerPage:10, currentPageNum:0, totalPageCount:0, startIndex:0, endIndex:0, previousPageEnable:false, nextPageEnable:false, cfRecordList:[]}))
        ).subscribe((response)=>{this.subject.next(response)});

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

    private generateQueryRequest(conditionFormData : ConditionFormData) : QueryRequest
    {
        let request = new QueryRequest();
        if (conditionFormData.moneyCondition.enable)
        {
            let upperLimit : number = conditionFormData.moneyCondition.upperLimit;
            let lowerLimit : number = conditionFormData.moneyCondition.lowerLimit;

            let condition = new MoneyCondition();
            request.moneyCondition = condition;

            condition.upperLimit = upperLimit;
            condition.lowerLimit = lowerLimit;

            if (0 < upperLimit && 0 < lowerLimit)
            {
                if (upperLimit == lowerLimit)
                {
                    condition.rangeType = EnumMoneyConditionRangeType.QUOTA;
                }
                else
                {
                    condition.rangeType = EnumMoneyConditionRangeType.RANGE;
                }
            }
            else if (0 < upperLimit)
            {
                condition.rangeType = EnumMoneyConditionRangeType.UPPER;
            }
            else
            {
                condition.rangeType = EnumMoneyConditionRangeType.LOWER;
            }
        }

        if (conditionFormData.inExCondition.enable)
        {
            let condition = new InExCategoryCondition();
            request.inExCategoryCondition = condition;

            condition.inExType = conditionFormData.inExCondition.inExType;
            condition.categoryIdSeries = (conditionFormData.inExCondition.inExCategories || []).toString();
        }

        if (conditionFormData.accountCondition.enable)
        {
            let condition = new AccountCondition();
            request.accountCondition = condition;

            condition.accIdSeries = conditionFormData.accountCondition.accounts.toString();
        }

        if (conditionFormData.tagCondition.enable)
        {
            let condition = new TagCondition();
            request.tagCondition = condition;
            
            condition.tagIdSeries = conditionFormData.tagCondition.tags.toString();
        }

        if (conditionFormData.dateTimeCondition.enable)
        {
            let condition = new RecordTimeCondition();
            request.recordTimeCondition = condition;
            
            condition.startDateTime = conditionFormData.dateTimeCondition.startDate;
            condition.endDateTime = conditionFormData.dateTimeCondition.endDate;
        }

        if (conditionFormData.ownerCondition.enable)
        {
            let condition = new OwnerCondition();
            request.ownerCondition = condition;
            
            condition.ownerIdSeries = conditionFormData.ownerCondition.owners.toString();
        }

        if (conditionFormData.remarkCondition.enable)
        {
            let condition = new RemarkCondition();
            request.remarkCondition = condition;
            
            condition.keyword = conditionFormData.remarkCondition.remark;
        }

        return request;
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
        if (cfRecordVO.tagIdList && cfRecordVO.tagIdList.length > 0)
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

export enum EnumQueryStatus
{
    NOT_QUERY_YET,

    QUERYING,

    QUERIED
}