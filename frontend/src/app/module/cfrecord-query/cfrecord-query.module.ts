import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CfRecordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { CfRecordListComponent } from './component/cfrecord-list/cfrecord-list.component';
import { CfRecordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { QueryConditionsComponent } from './component/query-conditions/query-conditions.component';
import { CfRecordQueryService } from './service/cfrecord-query.service';
import { CfRecordQueryRoutingModule } from './cfrecord-query-routing.module';
import { AccountSelectComponent } from '../../component/account-select/account-select.component';
import { EfSelectComponent, EfOptionPipe, EfOptionGroupPipe } from '../../component/ef-select/ef-select.component';
import { EfOptionDirective } from '../../component/ef-select/ef-option.directive';
import { EfOptionGroupDirective } from '../../component/ef-select/ef-option-group.directive';

@NgModule({
    declarations: [
        CfRecordQueryComponent,
        QueryConditionsComponent,
        CfRecordListComponent,
        CfRecordDetailComponent,
        AccountSelectComponent,
        EfSelectComponent,
        EfOptionDirective,
        EfOptionGroupDirective,
        EfOptionPipe,
        EfOptionGroupPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        CfRecordQueryRoutingModule
    ],
    providers: [
        CfRecordQueryService
    ]
})
export class CfRecordQueryModule { }