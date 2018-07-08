import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InExCategory } from '../entity/inex-category.entity';
import { EnumInExType } from '../enum/inex-type.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class InExCategoryService
{
    private incomeCategoryMap : Map<number, InExCategory> = new Map();

    private expensesCategoryMap : Map<number, InExCategory> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
       return this.http.get<InExCategory[]>("ef/inexcategory/list").pipe(
        map(categories => {
            categories.forEach(category => {
                switch(category.inExType)
                {
                    case EnumInExType.INCOME:
                    {
                        this.incomeCategoryMap.set(category.id, category);
                        break;
                    }
                    case EnumInExType.EXPENSES:
                    {
                        this.expensesCategoryMap.set(category.id, category);
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
}