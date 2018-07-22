import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

import { EnumInExType } from '../../../../enum/inex-type.enum';
import { AccountService } from '../../../../service/account.service';
import { PersonService } from '../../../../service/person.service';
import { TagService } from '../../../../service/tag.service';
import { CfRecordQueryService } from '../../service/cfrecord-query.service';
import { AccountGroup } from '../../../../entity/account.entity';
import { Person } from '../../../../entity/person.entity';
import { Tag } from '../../../../entity/tag.entity';
import { MoneyCondition, AccountCondition, TagCondition, RecordTimeCondition, OwnerCondition, RemarkCondition, InExCategoryCondition } from '../../../../entity/conditions.entity';
import { EnumMoneyConditionRangeType } from '../../../../enum/money-condition-range-type.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { InExGroup } from '../../../../entity/inex-category.entity';
import { InExCategoryService } from '../../../../service/inex-category.service';

@Component({
  templateUrl: './query-conditions.component.html',
  styleUrls: ['./query-conditions.component.css']
})
export class QueryConditionsComponent implements OnInit
{
    // 此变量是为了能在html里引用枚举
    private EnumInExType = EnumInExType;

    private accountGroups : AccountGroup[] = [];

    private persons : Person[] = [];

    private tags : Tag[] = [];

    private categoryGroup : InExGroup[] = [];
    private inCategoryGroup : InExGroup[] = [];
    private exCategoryGroup : InExGroup[] = [];

    private conditionForm : FormGroup;

    constructor(private fb : FormBuilder,
                private router : Router,
                private route : ActivatedRoute,
                private inExCategoryService : InExCategoryService,
                private accountService : AccountService,
                private personService : PersonService,
                private tagService : TagService,
                private cfRecordQueryService: CfRecordQueryService)
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
                startDate : null,
                endDate : null
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

        this.inCategoryGroup = this.inExCategoryService.getInExGroups(EnumInExType.INCOME);
        this.exCategoryGroup = this.inExCategoryService.getInExGroups(EnumInExType.EXPENSES);
        this.accountGroups = this.accountService.getAccountGroups();
        this.persons = this.personService.getPersons();
        this.tags = this.tagService.getTags();
    }

    public query(formData) : void
    {
        let conditions = this.formData2Conditions(formData);
        let ob = this.cfRecordQueryService.query(conditions);
        ob.subscribe(() => {this.router.navigate(['../list'], {relativeTo: this.route});});
    }

    private initMoneyConditionUI() : void
    {
        let moneyConditionGroup = this.conditionForm.get("moneyCondition");
        let enableControl = this.conditionForm.get("moneyCondition.enable");
        let lowerLimitControl = this.conditionForm.get("moneyCondition.lowerLimit");
        let upperLimitControl = this.conditionForm.get("moneyCondition.upperLimit");

        let moneyValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            let result = null;

            if (!lowerLimitControl.disabled && !upperLimitControl.disabled)
            {
                if (0 == lowerLimitControl.value && 0 == upperLimitControl.value)
                {
                    result = {'money' : 'Money Error!'};
                }
                else if (0 < lowerLimitControl.value && 0 < upperLimitControl.value)
                {
                    result = (lowerLimitControl.value > upperLimitControl.value) ? {'money' : 'Money Error!'} : null;
                }
            }

            lowerLimitControl.setErrors(result);
            upperLimitControl.setErrors(result);

            return result;
        };
        moneyConditionGroup.setValidators(moneyValidator);

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

        inExTypeControl.valueChanges.subscribe((inExType : EnumInExType) =>{
            switch(inExType)
            {
                case EnumInExType.INCOME:
                {
                    this.categoryGroup = this.inCategoryGroup;
                    break;
                }
                case EnumInExType.EXPENSES:
                {
                    this.categoryGroup = this.exCategoryGroup;
                    break;
                }
            }
            inExCategoriesControl.setValue([]);
        });
        this.categoryGroup = this.exCategoryGroup;
    }

    private initAccountConditionUI() : void
    {
        let enableControl = this.conditionForm.get("accountCondition.enable");
        let accountsControl = this.conditionForm.get("accountCondition.accounts");

        accountsControl.disable();
        accountsControl.setValidators(Validators.required);

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
        tagsControl.setValidators(Validators.required);

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
        let dateTimeConditionGroup = this.conditionForm.get("dateTimeCondition");
        let enableControl = this.conditionForm.get("dateTimeCondition.enable");
        let startDateControl = this.conditionForm.get("dateTimeCondition.startDate");
        let endDateControl = this.conditionForm.get("dateTimeCondition.endDate");

        let dateTimeValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            let result = null;

            if (!startDateControl.disabled && !endDateControl.disabled)
            {
                let startDate : Date = startDateControl.value;
                let endDate : Date = endDateControl.value;

                if (null == startDate && null ==endDate)
                {
                    result = {'datetime' : 'Datetime Error!'};
                }
                else if (null != startDate && null !=endDate)
                {
                    result = (startDate.getTime() > endDate.getTime()) ? {'datetime' : 'Datetime Error!'} : null;
                }
            }

            startDateControl.setErrors(result);
            endDateControl.setErrors(result);

            return result;
        };
        dateTimeConditionGroup.setValidators(dateTimeValidator);

        startDateControl.disable();
        endDateControl.disable();

        enableControl.valueChanges.subscribe(enable => {
            if (enable)
            {
                startDateControl.enable();
                endDateControl.enable();
            }
            else
            {
                startDateControl.disable();
                endDateControl.disable();
            }
        });
    }

    private initOwnerConditionUI() : void
    {
        let enableControl = this.conditionForm.get("ownerCondition.enable");
        let ownersControl = this.conditionForm.get("ownerCondition.owners");

        ownersControl.disable();
        ownersControl.setValidators(Validators.required);

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

    private formData2Conditions(formData)
    {
        let conditions = [];
        if (formData.moneyCondition.enable)
        {
            let upperLimit : number = formData.moneyCondition.upperLimit;
            let lowerLimit : number = formData.moneyCondition.lowerLimit;

            let condition = new MoneyCondition();
            conditions.push(condition);

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

        if (formData.inExCondition.enable)
        {
            let condition = new InExCategoryCondition();
            conditions.push(condition);

            condition.inExType = formData.inExCondition.inExType;
            condition.categoryIds = formData.inExCondition.inExCategories || [];
        }

        if (formData.accountCondition.enable)
        {
            let condition = new AccountCondition();
            conditions.push(condition);

            condition.accountIds = formData.accountCondition.accounts;
        }

        if (formData.tagCondition.enable)
        {
            let condition = new TagCondition();
            conditions.push(condition);
            
            condition.tagIds = formData.tagCondition.tags;
        }

        if (formData.dateTimeCondition.enable)
        {
            let condition = new RecordTimeCondition();
            conditions.push(condition);
            
            condition.startDateTime = formData.dateTimeCondition.startDate;
            condition.endDateTime = formData.dateTimeCondition.endDate;
        }

        if (formData.ownerCondition.enable)
        {
            let condition = new OwnerCondition();
            conditions.push(condition);
            
            condition.ownerIds = formData.ownerCondition.owners;
        }

        if (formData.remarkCondition.enable)
        {
            let condition = new RemarkCondition();
            conditions.push(condition);
            
            condition.keyword = formData.remarkCondition.remark;
        }

        return conditions;
    }
}