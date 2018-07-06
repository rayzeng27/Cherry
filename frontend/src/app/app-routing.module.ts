import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookkeepingComponent } from './component/bookkeeping/bookkeeping.component';

const appRoutes: Routes = [
  { path: 'bookkeeping',     component: BookkeepingComponent },
  { path: 'query-cfrecords', loadChildren: './module/cfrecord-query/cfrecord-query.module#CfRecordQueryModule' },
  { path: '', redirectTo: '/query-cfrecords', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
