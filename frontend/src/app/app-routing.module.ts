import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookkeepingComponent } from './component/bookkeeping/bookkeeping.component';
import { CfRcordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';

const appRoutes: Routes = [
  { path: 'bookkeeping',     component: BookkeepingComponent },
  { path: 'query-cfrecords', component: CfRcordQueryComponent },
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
