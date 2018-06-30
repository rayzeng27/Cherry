import { Injectable } from '@angular/core';
import { AccountService } from './Account.service';
import { InExCategoryService } from './InExCategory.service';
import { zip } from 'rxjs';

@Injectable({providedIn : 'root'})
export class StartupService 
{
  constructor(private accountService : AccountService,
              private inExCategoryService : InExCategoryService) 
    {
    }

  public startup(): Promise<Boolean> 
  {
    return new Promise((resolve, reject) => {
      zip(this.accountService.init(), this.inExCategoryService.init())
      .subscribe(() => {},
                 () => {},
                 () => {resolve(true);});
    });
  }
}