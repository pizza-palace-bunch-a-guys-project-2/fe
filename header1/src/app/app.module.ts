import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header3Component } from './header3/header3.component';
import { Footer2Component } from './footer2/footer2.component';

@NgModule({
  declarations: [
    AppComponent,
    Header3Component,
    Footer2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
