import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BookkeepingComponent } from './component/bookkeeping/bookkeeping.component';
import { StartupService } from './service/startup.service';
import { AppRoutingModule } from './/app-routing.module';

registerLocaleData(en);

export function AppInitializerFactory(startupService: StartupService): Function 
{
    return () => startupService.startup();
}

@NgModule({
    declarations: [
        AppComponent,
        BookkeepingComponent
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: AppInitializerFactory, deps: [StartupService], multi: true },
        { provide: NZ_I18N, useValue: en_US }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
