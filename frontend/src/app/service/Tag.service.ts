import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../entity/Tag.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class TagService
{
    private tagMap : Map<number, Tag> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
       return this.http.get<Tag[]>("ef/tag/list").pipe(
        map(tags => {
            tags.forEach(tag => {
                this.tagMap.set(tag.id, tag);
            });
            
            return true;
        })
       );
    }

    public getTag(id : number) : Tag
    {
        let tag = this.tagMap.get(id);

        return tag;
    }
}