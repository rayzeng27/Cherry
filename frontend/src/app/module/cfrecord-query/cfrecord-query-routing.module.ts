import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CfRcordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';

const cfRecordQueryRoutes: Routes = [
  { path: '', component: CfRcordQueryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(cfRecordQueryRoutes)
  ],
  exports: [ RouterModule ]
})
export class CfRecordQueryRoutingModule { }
