import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CfRecordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { CfRecordListComponent } from './component/cfrecord-list/cfrecord-list.component';
import { CfRecordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { QueryConditionsComponent } from './component/query-conditions/query-conditions.component';
import { Observable } from 'rxjs';
import { CfRecordQueryService, EnumQueryStatus } from './service/cfrecord-query.service';

@Injectable()
export class CheckQueryStatus implements CanActivate 
{
    constructor(private router : Router, 
                private cfRecordQueryService: CfRecordQueryService) 
    {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
    {
        let status = this.cfRecordQueryService.getStatus();
        if (EnumQueryStatus.NOT_QUERY_YET == status)
        {
            // scenario 1: enter 'query-cfrecords/list' in browser directly
            // scenario 2: enter 'query-cfrecords/detail' in browser directly
            this.router.navigate(['/query-cfrecords/conditions']);
        }

        return true;
    }
}

const cfRecordQueryRoutes: Routes = [
    { path: '', component: CfRecordQueryComponent,
      children: [
        { path: 'conditions', component: QueryConditionsComponent },
        { path: 'list', component: CfRecordListComponent, canActivate: [ CheckQueryStatus ] },
        { path: 'detail/:id', component: CfRecordDetailComponent, canActivate: [ CheckQueryStatus ] },
        { path: '', redirectTo: 'conditions', pathMatch: 'full'}
      ]
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(cfRecordQueryRoutes)
  ],
  exports: [ RouterModule ],
  providers: [ CheckQueryStatus ]
})
export class CfRecordQueryRoutingModule { }