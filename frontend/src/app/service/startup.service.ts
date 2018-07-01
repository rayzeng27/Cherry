import { Injectable } from '@angular/core';
import { AccountService } from './Account.service';
import { InExCategoryService } from './InExCategory.service';
import { PersonService } from './Person.service';
import { TagService } from './Tag.service';
import { zip } from 'rxjs';

@Injectable({providedIn : 'root'})
export class StartupService
{
  constructor(private accountService : AccountService,
              private inExCategoryService : InExCategoryService,
              private personService : PersonService,
              private tagService : TagService)
    {
    }

  public startup(): Promise<Boolean>
  {
    return new Promise((resolve, reject) => {
      zip(this.accountService.init(),
          this.inExCategoryService.init(),
          this.personService.init(),
          this.tagService.init())
      .subscribe(() => {},
                 () => {},
                 () => {resolve(true);});
    });
  }
}