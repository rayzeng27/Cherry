import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CfRecordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { CfRecordListComponent } from './component/cfrecord-list/cfrecord-list.component';
import { CfRecordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { QueryConditionsComponent } from './component/query-conditions/query-conditions.component';

const cfRecordQueryRoutes: Routes = [
  { path: '', component: CfRecordQueryComponent,
    children: [
      { path: 'conditions', component: QueryConditionsComponent },
      { path: 'list', component: CfRecordListComponent },
      { path: 'detail/:id', component: CfRecordDetailComponent },
      { path: '', redirectTo: 'conditions', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(cfRecordQueryRoutes)
  ],
  exports: [ RouterModule ]
})
export class CfRecordQueryRoutingModule { }
