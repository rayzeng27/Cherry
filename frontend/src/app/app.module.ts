import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { CapitalFlowRecordService } from './service/CapitalFlowRecord.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CfRcordDetailComponent } from './component/cfrecord-detail/cfrecord-detail.component';
import { BookkeepingComponent } from './component/bookkeeping/bookkeeping.component';
import { CfRcordQueryComponent } from './component/cfrecord-query/cfrecord-query.component';
import { StartupService } from './service/Startup.service';
import { AppRoutingModule } from './/app-routing.module';

registerLocaleData(en);

export function AppInitializerFactory(startupService: StartupService): Function 
{
    return () => startupService.startup();
}

@NgModule({
    declarations: [
        AppComponent,
        BookkeepingComponent,
        CfRcordQueryComponent,
        CfRcordDetailComponent
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        AppRoutingModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: AppInitializerFactory, deps: [StartupService], multi: true },
        { provide: NZ_I18N, useValue: en_US }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
