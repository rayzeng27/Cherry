import { Injectable } from '@angular/core';

@Injectable()
export class InExCategoryService
{
    public getCategoryName (categoryId : number) : string
    {
        return "测试分类";
    }
}