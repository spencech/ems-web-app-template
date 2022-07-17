import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { LoaderService, LoaderType } from "ems-web-app-loader";
import { PageViewerService } from "ems-web-app-page-viewer";
import { ModalService, ModalData } from "ems-web-app-modal";
import { trace, delay, kebab } from "ems-web-app-utils";
import { SanitizerType } from "ems-web-app-pipes";
import { BreakpointService, Breakpoint, BreakpointValue, BreakpointType } from "ems-web-app-breakpoint-detection";
import { MessagesService, MessageType, MessagePosition } from "ems-web-app-messages";
import { Page, User } from "../../classes";
import { AppService, HttpService, ContentService } from "../../services";
import { CognitoService, CognitoFormType, CognitoStrings, ICognitoUserData } from "ems-web-app-cognito";
import { ViewContainerService } from "ems-web-app-view-container";

enum DocType {
  Loader = "/assets/loader.readme.html",
  Modal = "/assets/modal.readme.html",
  PageViewer = "/assets/page-viewer.readme.html",
  SeatTime = "/assets/seat-time.readme.html",
  Utils ="/assets/utils.readme.html",
  Pipes = "/assets/pipes.readme.html",
  Breakpoint = "/assets/breakpoint.readme.html",
  Messages = "/assets/messages.readme.html",
  Cognito = "/assets/cognito.readme.html",
  ViewContainer = "/assets/view-container.readme.html"
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
  public currentDoc?: DocType;
  public currentUser?: User;
  public authenticated: boolean = false;
  public docs: DocType[] = [DocType.Loader, DocType.Modal, DocType.PageViewer, DocType.SeatTime, DocType.Utils,
                            DocType.Pipes, DocType.Breakpoint, DocType.Messages, DocType.Cognito, DocType.ViewContainer];

  constructor(public content: ContentService, public loader: LoaderService, public viewer: PageViewerService, 
                private app: AppService, private http: HttpService, private modal: ModalService,
                private breakpoint: BreakpointService, private messages: MessagesService, 
                private cognito: CognitoService, private viewContainer: ViewContainerService) {

  }

  ngOnInit() {
    this.viewer.page.subscribe(page => {
      this.currentPageClass = kebab(page ?? "");
    });

    this.app.user.subscribe(user => {
      if(!user) return;
      this.currentUser = user;
      trace("current user loaded", user);
    });

    this.breakpoint.currentBreakpoint.subscribe(breakpoint => {
      trace(`current breakpoint type: ${breakpoint?.type}`, `current breakpoint value: ${breakpoint?.value}`);
    });

    this.cognito.session$.subscribe(session => {
      delay(() => this.authenticated = session ? true : false );
    });
  }

  ngAfterViewInit() {
    delay(() => this.initialize());
  }

  onSeatTimeUpdate(time: number) {
    this.time = time;
  }

  showMessage() {
    this.messages.setCurrentMessage({
      type: MessageType.Growl,
      position: MessagePosition.TopRight,
      message: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      duration: 5
    });
  }

  showSnackbarMessage() {
    this.messages.setCurrentMessage({
      type: MessageType.Snackbar,
      position: MessagePosition.TopCenter,
      message: "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      duration: 5
    });
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
    this.currentDoc = requested;
    this.viewContainer.setCurrentView(this.getDocId(requested), "document-container");
  }

  onConnecting(connecting: any) {
    this.loader.load(connecting);
  }

  onAuthenticated(info: ICognitoUserData | null) {
    trace("user information", info);
  }

  login() {
    alert(`You can use the following credentials to log in. Username: test@educationalmediasolutions.com , Password: TempPassword1! `);
    this.cognito.showForm(CognitoFormType.Login);
  }

  loginWithGoogle() {
    this.cognito.showForm(CognitoFormType.GoogleSignIn);
  }

  logout() {
    this.loader.show();
    this.cognito.logout();
    window.location.reload();
  }

  getDocId(type: string): string {
    return type.replace(/^.*\/(.*?).readme.html/i,"$1");
  }

  public onCancelModal = () => {
    this.modal.setCurrentModal(null);
  }

  private async initialize() {
    this.loader.show();

    const user = await this.http.getUser();
    this.app.setCurrentUser(user);
    
    this.initialized = true;
    this.viewer.setCurrentPage(Page.Home);
    this.loader.hide();
  }

}
