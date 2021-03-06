import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../entity/person.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class PersonService
{
    private personMap : Map<number, Person> = new Map();

    constructor(private http: HttpClient)
    {
    }

    public init() : Observable<Boolean>
    {
       return this.http.get<Person[]>("ef/person/list").pipe(
        map(persons => {
            persons.forEach(person => {
                this.personMap.set(person.id, person);
            });
            
            return true;
        })
       );
    }

    public getPerson(id : number) : Person
    {
        let person = this.personMap.get(id);

        return person;
    }

    public getPersons() : Person[]
    {
        let persons = Array.from(this.personMap.values());
        return persons;
    }
}