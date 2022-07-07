import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeResourceUrl, SafeStyle, SafeScript } from '@angular/platform-browser';
import { SanitizerType } from "../../classes";

@Pipe({
  name: 'safe'
})
@Injectable()
export class SafePipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string, type: SanitizerType = SanitizerType.Html): SafeHtml | SafeUrl | SafeResourceUrl | SafeStyle | SafeScript {
  	if(type === SanitizerType.ResourceUrl) return this.sanitizer.bypassSecurityTrustResourceUrl(content);
  	else if(type === SanitizerType.Url) return this.sanitizer.bypassSecurityTrustUrl(content);
  	else if(type === SanitizerType.Style) return this.sanitizer.bypassSecurityTrustStyle(content);
  	else if(type === SanitizerType.Script) return this.sanitizer.bypassSecurityTrustScript(content);
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
