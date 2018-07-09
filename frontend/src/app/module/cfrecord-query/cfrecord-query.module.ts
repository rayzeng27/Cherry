import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CfRecordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { CfRecordListComponent } from './component/cfrecord-list/cfrecord-list.component';
import { CfRecordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { QueryConditionsComponent } from './component/query-conditions/query-conditions.component';
import { CfRecordQueryService } from './service/cfrecord-query.service';
import { CfRecordQueryRoutingModule } from './cfrecord-query-routing.module';

@NgModule({
    declarations: [
        CfRecordQueryComponent,
        QueryConditionsComponent,
        CfRecordListComponent,
        CfRecordDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        CfRecordQueryRoutingModule
    ],
    providers: [
        CfRecordQueryService
    ]
})
export class CfRecordQueryModule { }