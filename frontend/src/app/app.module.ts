import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { CapitalFlowRecordService } from './service/CapitalFlowRecord.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [CapitalFlowRecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
