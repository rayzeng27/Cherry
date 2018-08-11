import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EnumInExType } from '../../../../enum/inex-type.enum';

import { AccountService } from '../../../../service/account.service';
import { PersonService } from '../../../../service/person.service';
import { TagService } from '../../../../service/tag.service';
import { InExCategoryService } from '../../../../service/inex-category.service';
import { CfRecordQueryService, EnumQueryStatus } from '../../service/cfrecord-query.service';

import { AccountGroup } from '../../../../entity/account.entity';
import { Person } from '../../../../entity/person.entity';
import { Tag } from '../../../../entity/tag.entity';
import { InExGroup } from '../../../../entity/inex-category.entity';

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

    private inCategoryGroups : InExGroup[] = [];
    private exCategoryGroups : InExGroup[] = [];

    private conditionForm : FormGroup;

    constructor(private fb : FormBuilder,
                private router : Router,
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

        this.inCategoryGroups = this.inExCategoryService.getInExGroups(EnumInExType.INCOME);
        this.exCategoryGroups = this.inExCategoryService.getInExGroups(EnumInExType.EXPENSES);
        this.accountGroups = this.accountService.getAccountGroups();
        this.persons = this.personService.getPersons();
        this.tags = this.tagService.getTags();

        if (EnumQueryStatus.QUERIED == this.cfRecordQueryService.getStatus())
        {
            let conditionFormData = this.cfRecordQueryService.getConditionFormData();
            this.conditionForm.setValue(conditionFormData);
        }
    }

    public query() : void
    {
        let conditionFormData = this.conditionForm.getRawValue();
        this.cfRecordQueryService.query(conditionFormData);
        this.router.navigate(['/query-cfrecords/list']);
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
            inExCategoriesControl.setValue([]);
        });
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
}