import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {Env} from "../model/Env";
import {ENV_INFOS} from "../model/global";
import {AppInfo} from "../model/AppInfo";

@Component({
  selector: 'version',
  templateUrl: './version.component.html'
})

export class VersionComponent {
  private envs: Env[];
  appGroups: String[];
  appGroupToEnvsMap = new Map<String, Array<Env>>;
  displayEnvs = new Array<Env>();

  constructor() {
    this.envs = JSON.parse(ENV_INFOS) as Env[];
    this.appGroups = this.createAppGroups();
    this.populateAppGroupToEnvsMap();
  }

  private createAppGroups(): String[] {
    const appSet = new Set<String>();
    for (const e of this.envs) {
      // TODO: refactor this; not efficient
      e.appInfos.forEach(a => {
        appSet.add(a.group);
      });
      // for (const a of e.appInfos.values()) {
      //   if (appSet.has(a.group)) {
      //     continue;
      //   }
      //   appSet.add(a.group);
      // }
    }

    for (const s of Array.from(appSet.values())) {
      console.log(s);
    }
    return Array.from(appSet.values());
  }

  private populateAppGroupToEnvsMap() {
    for(const appGroup of this.appGroups) {
      this.appGroupToEnvsMap.set(appGroup, new Array<Env>);
    }

    for(const appGroup of this.appGroups) {
      for(const e of this.envs) {
        const nuEnv = new Env();
        nuEnv.name = e.name;
        nuEnv.appInfos = new Array<AppInfo>;

        for(const a of e.appInfos) {
          if (a.group === appGroup) {
            nuEnv.appInfos.push(a);
          }
        }
        this.appGroupToEnvsMap.get(appGroup)?.push(nuEnv);
        // this.appGroupToEnvsMap.get(appGroup).add(nuEnv);
        // this.appGroupToEnvsMap.set(appGroup, nuEnv);
      }
    }
    console.log("done");
  }

  // private createDisplayEnvs(appGroup: String): Array<Env>{
  //   const appSet = new Set<String>();
  //   for (const e of envs) {
  //     for (const a of e.appinfos) {
  //       if (appSet.has(a.group)) {
  //         continue;
  //       }
  //       appSet.add(a.group);
  //     }
  //   }
  //   for (const s of Array.from(appSet.values())) {
  //     console.log(s);
  //   }
  //   return Array.from(appSet.values());
  // }

  onLoad() {
    alert("onLoad");
  }
}
