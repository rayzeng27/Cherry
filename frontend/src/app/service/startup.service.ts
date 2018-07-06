import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { InExCategoryService } from './inexcategory.service';
import { PersonService } from './person.service';
import { TagService } from './tag.service';
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