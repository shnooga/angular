import {Injectable} from "@angular/core";
import {AppInfo} from "../model/AppInfo";
import {AppInfoNu} from "../model/AppInfoNu";
import {HttpClient} from "@angular/common/http";
import {BuildInfo} from "../model/BuildInfo";


@Injectable()
export class AppInfoUtil {

  constructor(private httpClient: HttpClient) {
  }

  extractAppInfo(json: string, appName: string): AppInfo {
    let myObj = JSON.parse(json) as any;
    return myObj[appName] as AppInfo;
  }

  getVersionInfo(appName: string, uri: string, appInfo: AppInfoNu) {
    this.httpClient
      .get<Object>(uri)
      // .subscribe( r => this.handleNext(r)); // Short hand for next only.
      .subscribe({
        next: (r: Object) => this.handleNext(r, appName, appInfo),
        // error: (e: Error) => this.handleError(e.message),
        complete: () => console.log("Stream completed")
      });
  }

  handleNext(response: Object, appName: string, appInfo: AppInfoNu) {
    console.log(response);
    let liveColor = "";
    let s = JSON.stringify(response[appName as keyof typeof response]);
    if (s !== undefined) {
      let b: BuildInfo = JSON.parse(s);
      liveColor = b.liveColor;
      appInfo.buildInfos.push(JSON.parse(s));
    }
    s = JSON.stringify(response['build' as keyof typeof response]);
    if (s !== undefined) {
      let b: BuildInfo = JSON.parse(s);
      b.liveColor = liveColor;
      appInfo.buildInfos.push(b);
    }
    s = JSON.stringify(response['WGU-Boot-build' as keyof typeof response]);
    if (s !== undefined) {
      appInfo.buildInfos.push(JSON.parse(s));
    }
    console.log(appInfo);
  }
}
