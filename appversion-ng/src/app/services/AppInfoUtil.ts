import {Injectable} from "@angular/core";
import {VersionRequest} from "../model/VersionRequest";
import {AppInfo} from "../model/AppInfo";
import {HttpClient} from "@angular/common/http";
import {BuildInfo} from "../model/BuildInfo";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {Env} from "../model/Env";


@Injectable()
export class AppInfoUtil {
  private isRefreshSubject: BehaviorSubject<boolean>;
  isRefresh$: Observable<boolean>;

  private envDataList: Array<Env>;
  envData$: Observable<Array<Env>>;

  constructor(private httpClient: HttpClient) {
    this.isRefreshSubject = new BehaviorSubject<boolean>(false);
    this.isRefresh$ = this.isRefreshSubject.asObservable();

    this.envDataList = new Array<Env>();
    this.envData$ = of(this.envDataList);
  }

  extractAppInfo(json: string, appName: string): VersionRequest {
    let myObj = JSON.parse(json) as any;
    return myObj[appName] as VersionRequest;
  }

  getVersionInfo(env: Env, request: VersionRequest) {
    this.httpClient
      .get<Object>(request.url)
      // .subscribe( r => this.handleNext(r)); // Short hand for next only.
      .subscribe({
        next: (r: Object) => this.handleNext(r, request.name, env),
        // error: (e: Error) => this.handleError(e.message),
        complete: () => console.log("Stream completed")
        // complete: () => console.log(appInfo)
      });
  }

  handleNext(response: Object, appName: string, env: Env) {
    let appInfo = new AppInfo();
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
    env.appInfos.push(appInfo);
    console.log(appInfo);
  }

  handleOnRefresh(envs: Array<Env>) {
    this.isRefreshSubject.next(true);
    this.envDataList.splice(0, this.envDataList.length);
    for(const e of envs) {
      this.envDataList.push(e);
    }
  }
}
