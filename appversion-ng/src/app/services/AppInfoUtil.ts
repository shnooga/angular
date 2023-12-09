import {Injectable} from "@angular/core";
import {VersionRequest} from "../model/VersionRequest";
import {AppInfo} from "../model/AppInfo";
import {HttpClient} from "@angular/common/http";
import {BuildInfo} from "../model/BuildInfo";


@Injectable()
export class AppInfoUtil {

  constructor(private httpClient: HttpClient) {
  }

  extractAppInfo(json: string, appName: string): VersionRequest {
    let myObj = JSON.parse(json) as any;
    return myObj[appName] as VersionRequest;
  }

  getVersionInfo(request: VersionRequest, appInfo: AppInfo) {
    this.httpClient
      .get<Object>(request.url)
      // .subscribe( r => this.handleNext(r)); // Short hand for next only.
      .subscribe({
        next: (r: Object) => this.handleNext(r, request.name, appInfo),
        // error: (e: Error) => this.handleError(e.message),
        complete: () => console.log("Stream completed")
      });
  }

  handleNext(response: Object, appName: string, appInfo: AppInfo) {
    appInfo.jsonValue = JSON.stringify(response);
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
