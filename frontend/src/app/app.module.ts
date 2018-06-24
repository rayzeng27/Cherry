import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { CapitalFlowRecordService } from './service/CapitalFlowRecord.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CfRcordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CfRcordDetailComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [CapitalFlowRecordService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [CfRcordDetailComponent]
})
export class AppModule { }
