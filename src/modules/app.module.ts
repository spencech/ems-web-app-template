import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, ModalService } from "ems-web-app-modal";
import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";
import { LoaderModule, LoaderService } from "ems-web-app-loader";
import { SeatTimeModule } from "ems-web-app-seat-time";
import { PipesModule } from "ems-web-app-pipes";
import { BreakpointModule, BreakpointService } from "ems-web-app-breakpoint-detection"

import { AppComponent } from '../components';
import { AppService, HttpService, ContentService } from "../services";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    LoaderModule,
    PageViewerModule,
    SeatTimeModule,
    PipesModule,
    BreakpointModule
  ],
  providers: [ ModalService, LoaderService, PageViewerService, AppService, HttpService, ContentService, BreakpointService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
