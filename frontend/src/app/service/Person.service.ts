import { Injectable } from '@angular/core';

@Injectable()
export class PersonService
{
    public getPersonName (personId : number) : string
    {
        return "测试人员";
    }
}