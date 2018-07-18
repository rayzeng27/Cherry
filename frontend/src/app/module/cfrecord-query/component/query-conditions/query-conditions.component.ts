import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EnumInExType } from '../../../../enum/inex-type.enum';
import { AccountService } from '../../../../service/account.service';
import { AccountGroup } from '../../../../entity/account.entity';

@Component({
  templateUrl: './query-conditions.component.html',
  styleUrls: ['./query-conditions.component.css']
})
export class QueryConditionsComponent implements OnInit
{
    // 此变量是为了能在html里引用枚举
    private EnumInExType = EnumInExType;

    private accountGroups : AccountGroup[] = [];

    private conditionForm : FormGroup;

    constructor(private fb : FormBuilder,
                private accountService : AccountService) 
    {
    }

    ngOnInit() 
    {
        this.conditionForm = this.fb.group({
            moneyCondition : this.fb.group({
                enable : false,
                lowerLimit : 0,
                upperLimit : 0
            }),
            inExCondition : this.fb.group({
                enable : false,
                inExType : EnumInExType.EXPENSES,
                inExCategories : []
            }),
            accountCondition : this.fb.group({
                enable : false,
                accounts : []
            }),
            tagCondition : this.fb.group({
                enable : false,
                tags : []
            }),
            dateTimeCondition : this.fb.group({
                enable : false,
                dateRange : null
            }),
            ownerCondition : this.fb.group({
                enable : false,
                owners : []
            }),
            remarkCondition : this.fb.group({
                enable : false,
                remark : ""
            })
        });

        this.initMoneyConditionUI();
        this.initInExConditionUI();
        this.initAccountConditionUI();
        this.initTagConditionUI();
        this.initDateTimeConditionUI();
        this.initOwnerConditionUI();
        this.initRemarkConditionUI();

        this.accountGroups = this.accountService.getAccountGroups();
    }

    private initMoneyConditionUI() : void
    {
        let enableControl = this.conditionForm.get("moneyCondition.enable");
        let lowerLimitControl = this.conditionForm.get("moneyCondition.lowerLimit");
        let upperLimitControl = this.conditionForm.get("moneyCondition.upperLimit");

        lowerLimitControl.disable();
        upperLimitControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                lowerLimitControl.enable();
                upperLimitControl.enable();
            }
            else
            {
                lowerLimitControl.disable();
                upperLimitControl.disable();
            }
        });
    }

    private initInExConditionUI() : void
    {
        let enableControl = this.conditionForm.get("inExCondition.enable");
        let inExTypeControl = this.conditionForm.get("inExCondition.inExType");
        let inExCategoriesControl = this.conditionForm.get("inExCondition.inExCategories");

        inExTypeControl.disable();
        inExCategoriesControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                inExTypeControl.enable();
                inExCategoriesControl.enable();
            }
            else
            {
                inExTypeControl.disable();
                inExCategoriesControl.disable();
            }
        });
    }

    private initAccountConditionUI() : void
    {
        let enableControl = this.conditionForm.get("accountCondition.enable");
        let accountsControl = this.conditionForm.get("accountCondition.accounts");

        accountsControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                accountsControl.enable();
            }
            else
            {
                accountsControl.disable();
            }
        });
    }

    private initTagConditionUI() : void
    {
        let enableControl = this.conditionForm.get("tagCondition.enable");
        let tagsControl = this.conditionForm.get("tagCondition.tags");

        tagsControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                tagsControl.enable();
            }
            else
            {
                tagsControl.disable();
            }
        });
    }

    private initDateTimeConditionUI() : void
    {
        let enableControl = this.conditionForm.get("dateTimeCondition.enable");
        let dateRangeControl = this.conditionForm.get("dateTimeCondition.dateRange");

        dateRangeControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                dateRangeControl.enable();
            }
            else
            {
                dateRangeControl.disable();
            }
        });
    }

    private initOwnerConditionUI() : void
    {
        let enableControl = this.conditionForm.get("ownerCondition.enable");
        let ownersControl = this.conditionForm.get("ownerCondition.owners");

        ownersControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                ownersControl.enable();
            }
            else
            {
                ownersControl.disable();
            }
        });
    }

    private initRemarkConditionUI() : void
    {
        let enableControl = this.conditionForm.get("remarkCondition.enable");
        let remarkControl = this.conditionForm.get("remarkCondition.remark");

        remarkControl.disable();
        remarkControl.setValidators(Validators.required);

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                remarkControl.enable();
            }
            else
            {
                remarkControl.disable();
            }
        });
    }
}