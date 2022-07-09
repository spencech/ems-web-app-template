import { TestBed, async, tick, fakeAsync, inject, flush, discardPeriodicTasks } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AppService, HttpService, ContentService } from "../../services";
import { ModalModule, ModalService, ModalData } from "ems-web-app-modal";
import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";
import { LoaderModule, LoaderService } from "ems-web-app-loader";
import { SeatTimeModule, SeatTimeComponent } from "ems-web-app-seat-time";
import { PipesModule } from "ems-web-app-pipes";
import { Page } from "../../classes";

describe('AppComponent', () => {
  let modalService: ModalService, loaderService: LoaderService, viewerService: PageViewerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ModalModule,
        LoaderModule,
        PageViewerModule,
        SeatTimeModule,
        PipesModule
      ],
      providers: [AppService, HttpService, ContentService, ModalService, PageViewerService, LoaderService],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();

     modalService = TestBed.inject(ModalService);
     loaderService = TestBed.inject(LoaderService);
     viewerService = TestBed.inject(PageViewerService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the loader animation', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    loaderService.show();
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("loader").classList.contains("showLoader")).toBeTruthy()
    discardPeriodicTasks()
  }));

  it('should hide the loader animation once rendered and a hide request is made', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    loaderService.show();
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("loader").classList.contains("showLoader")).toBeTruthy()
    loaderService.hide();
    fixture.detectChanges();
    tick(1200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("loader").classList.contains("showLoader")).toBeFalsy();
    discardPeriodicTasks()
  }));

  it('should render a modal window when requested', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const data = new ModalData();
    modalService.setCurrentModal(data);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("modal").classList.contains("render")).toBeTruthy()
    discardPeriodicTasks()
  }));

  it('should hide a modal window once rendered and a close request is made', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const data = new ModalData();
    modalService.setCurrentModal(data);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("modal").classList.contains("render")).toBeTruthy();
    modalService.setCurrentModal(null);
    fixture.detectChanges();
    tick(1200);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector("modal").classList.contains("render")).toBeFalsy();
    discardPeriodicTasks()
  }));

  it('should render a page template when requested', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    viewerService.setCurrentPage(Page.Home);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    const viewer = fixture.nativeElement.querySelector("page-viewer")
    expect(viewer.children.length).toBeGreaterThan(0);
    discardPeriodicTasks()
  }));

  it('should render a page with a classname that corresponds to its enum when requested', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    viewerService.setCurrentPage(Page.Home);
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
    const viewer = fixture.nativeElement.querySelector("page-viewer")
    expect(viewer.classList.contains(Page.Home)).toBeTruthy();
    discardPeriodicTasks()
  }));

});
