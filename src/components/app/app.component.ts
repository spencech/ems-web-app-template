import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { LoaderService, LoaderType } from "ems-web-app-loader";
import { PageViewerService } from "ems-web-app-page-viewer";
import { ModalService, ModalData } from "ems-web-app-modal";
import { trace, delay, kebab } from "ems-web-app-utils";
import { Page } from "../../classes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild("exampleModalTemplate") template!: TemplateRef<any>;

  public initialized: boolean = false;
  public time: number = 0;
  public loaderDuration: number = 1000;
  public loaderSize: number = 200;
  public loading: boolean = false;
  public Page = Page;
  public currentPageClass: string = "";

  constructor(public loader: LoaderService, public viewer: PageViewerService, private modal: ModalService) {

  }

  ngOnInit() {
    this.viewer.page.subscribe(page => {
      this.currentPageClass = kebab(page ?? "");
    })
  }

  ngAfterViewInit() {
    delay(this.initialize);
  }

  onSeatTimeUpdate(time: number) {
    this.time = time;
  }

  showSpinner() {
    this.loading = true;
    this.loaderDuration = 1000;
    this.loaderSize = 200;
    this.loader.load(true, LoaderType.Spinner);
  }

  showEllipsis() {
    this.loading = true;
    this.loaderDuration = 600;
    this.loaderSize = 14;
    this.loader.load(true, LoaderType.Ellipsis);
  }

  hideLoader() {
    this.loading = false;
    this.loader.hide();
  }

  launchSampleModal() {
    const data = new ModalData();
    data.template = this.template;
    data.cancel = this.onCancelModal;
    this.modal.setCurrentModal(data);
  }

  public onCancelModal = () => {
    this.modal.setCurrentModal(null);
  }

  private initialize = () => {
    this.loader.show();
    delay(() => {
      this.initialized = true;
      this.viewer.setCurrentPage(Page.Home);
      this.loader.hide();
    }, 2000);
  }

}
