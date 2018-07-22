import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InExCategory, InExGroup } from '../entity/inex-category.entity';
import { EnumInExType } from '../enum/inex-type.enum';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class InExCategoryService
{
    private incomeGroupMap : Map<number, InExGroup> = new Map();

    private expensesGroupMap : Map<number, InExGroup> = new Map();

    private incomeCategoryMap : Map<number, InExCategory> = new Map();

    private expensesCategoryMap : Map<number, InExCategory> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
        return zip(this.http.get<InExCategory[]>("ef/inex-category/list"), 
                   this.http.get<InExGroup[]>("ef/inex-group/list"))
                .pipe(map(result => {
                    let categories = result[0];
                    let groups = result[1];

                    groups.forEach(group => {
                        switch(group.inExType)
                        {
                            case EnumInExType.INCOME:
                            {
                                this.incomeGroupMap.set(group.id, group);
                                break;
                            }
                            case EnumInExType.EXPENSES:
                            {
                                this.expensesGroupMap.set(group.id, group);
                                break;
                            }
                        }
                    });

                    categories.forEach(category => {
                        switch(category.inExType)
                        {
                            case EnumInExType.INCOME:
                            {
                                this.incomeCategoryMap.set(category.id, category);

                                // add category to group
                                if (category.groupId > 0)
                                {
                                    let group = this.incomeGroupMap.get(category.groupId);
                                    if (null == group.categories)
                                    {
                                        group.categories = [];
                                    }
                                    group.categories.push(category);
                                }
                                break;
                            }
                            case EnumInExType.EXPENSES:
                            {
                                this.expensesCategoryMap.set(category.id, category);

                                // add category to group
                                if (category.groupId > 0)
                                {
                                    let group = this.expensesGroupMap.get(category.groupId);
                                    if (null == group.categories)
                                    {
                                        group.categories = [];
                                    }
                                    group.categories.push(category);
                                }
                                break;
                            }
                        }
                    });

                    return true;
                })
            );
    }

    public getInExCategory(inExType : EnumInExType, id : number) : InExCategory
    {
        switch(inExType)
        {
            case EnumInExType.INCOME:
            {
                return this.incomeCategoryMap.get(id);
            }
            case EnumInExType.EXPENSES:
            {
                return this.expensesCategoryMap.get(id);
            }
        }

        return null;
    }

    public getInExGroups(inExType : EnumInExType) : InExGroup[]
    {
        let groups = null;

        switch(inExType)
        {
            case EnumInExType.INCOME:
            {
                groups = Array.from(this.incomeGroupMap.values());
                break;
            }
            case EnumInExType.EXPENSES:
            {
                groups = Array.from(this.expensesGroupMap.values());
                break;
            }
        }

        return groups;
    }
}