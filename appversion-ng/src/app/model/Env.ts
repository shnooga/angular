import {VersionRequest} from "./VersionRequest";
import {AppInfo} from "./AppInfo";

export class Env {
  name = "";
  versionRequests = new Array<VersionRequest>;
  appInfos = new Array<AppInfo>;
}
