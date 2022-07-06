import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule, ModalService } from "ems-web-app-modal";
import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";
import { LoaderModule, LoaderService } from "ems-web-app-loader";
import { SeatTimeModule } from "ems-web-app-seat-time";


import { AppComponent } from '../components';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ModalModule,
    LoaderModule,
    PageViewerModule,
    SeatTimeModule
  ],
  providers: [ ModalService, LoaderService, PageViewerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
