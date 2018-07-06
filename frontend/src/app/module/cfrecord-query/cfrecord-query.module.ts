import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CfRcordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { CfRcordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { CfRecordQueryService } from './service/cfrecord-query.service';
import { CfRecordQueryRoutingModule } from './cfrecord-query-routing.module';

@NgModule({
    declarations: [
        CfRcordQueryComponent,
        CfRcordDetailComponent
    ],
    imports: [
        CommonModule,
        NgZorroAntdModule,
        CfRecordQueryRoutingModule
    ],
    providers: [
        CfRecordQueryService
    ]
})
export class CfRecordQueryModule { }
