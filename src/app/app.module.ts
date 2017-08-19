
import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { AppComponent }                     from './app.component';
import { HomeComponent }                    from './web/components/home/home.component';
import { PageNotFoundComponent }            from './web/components/page-not-found/page-not-found.component';
import { SharedModule }                     from './shared/shared.module';
import { SharedModule as SharedModuleWeb }  from './web/shared/shared.module';
import { routing }                          from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModuleWeb,
    routing,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
