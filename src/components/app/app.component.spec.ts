import { TestBed, async, tick, fakeAsync, inject, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { AppService, HttpService } from "../../services";
import { ModalModule, ModalService } from "ems-web-app-modal";
import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";
import { LoaderModule, LoaderService } from "ems-web-app-loader";
import { SeatTimeModule } from "ems-web-app-seat-time";
import { PipesModule } from "ems-web-app-pipes";

describe('AppComponent', () => {
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
      providers: [AppService, HttpService, ModalService, PageViewerService, LoaderService],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /*it(`should have as title 'web-app-template'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('web-app-template');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('web-app-template app is running!');
  });*/
});
