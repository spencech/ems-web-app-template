import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { LoaderService, LoaderType } from "ems-web-app-loader";
import { PageViewerService } from "ems-web-app-page-viewer";
import { ModalService, ModalData } from "ems-web-app-modal";
import { trace, delay, kebab } from "ems-web-app-utils";
import { Page, SanitizerType } from "../../classes";
import { AppService, HttpService, ContentService } from "../../services";

enum DocType {
  Loader = "/assets/loader.readme.html",
  Modal = "/assets/modal.readme.html",
  PageViewer = "/assets/page-viewer.readme.html",
  SeatTime = "/assets/seat-time.readme.html",
  Utils ="/assets/utils.readme.html"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild("exampleModalTemplate") template!: TemplateRef<any>;

  public initialized: boolean = false;
  public transitioning: boolean = false;
  public time: number = 0;
  public loaderDuration: number = 1000;
  public loaderSize: number = 200;
  public loading: boolean = false;
  public Page = Page;
  public SanitizerType = SanitizerType;
  public DocType = DocType;
  public currentPageClass: string = "";
  public currentDoc: DocType = DocType.Utils;
  public requestedDoc: DocType = DocType.Utils;

  constructor(public content: ContentService, public loader: LoaderService, public viewer: PageViewerService, 
                private app: AppService, private http: HttpService, private modal: ModalService) {

  }

  ngOnInit() {
    this.viewer.page.subscribe(page => {
      this.currentPageClass = kebab(page ?? "");
    })
  }

  ngAfterViewInit() {
    delay(() => this.initialize());
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

  changeDoc(requested: DocType) {
    this.requestedDoc = requested; //allows button state to change immediately
    this.transitioning = true; //starts fade down
    delay(() => {
      this.currentDoc = requested;
      delay(() => this.transitioning = false);
    }, 250);
  }

  public onCancelModal = () => {
    this.modal.setCurrentModal(null);
  }

  private async initialize() {
    this.loader.show();
    
    delay(() => {
      this.initialized = true;
      this.viewer.setCurrentPage(Page.Home);
      this.loader.hide();
    }, 2000);
  }

}
