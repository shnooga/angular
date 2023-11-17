import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
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
  apps!: String[];
  appGroups!: String[];
  appGroupToEnvsMap = new Map<String, Array<Env>>;
  displayEnvs = new Array<Env>();

  // contactForm! means will be set latery2yy2y
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.envs = JSON.parse(ENV_INFOS) as Env[];
    this.populateSelectOptions();
    this.populateAppGroupToEnvsMap();
    // this.setDefaultSelections();

    this.myForm = this.fb.group({
      appGroupCtl: [null],
      appCtl: [null]
    });

    this.myForm.get("appGroup")?.valueChanges
      .subscribe(f => {
        this.onAppGroupChanged(f);
      })
  }

  private populateSelectOptions() {
    const appNameSet = new Set<String>();
    const appGroupNameSet = new Set<String>();
    for (const e of this.envs) {
      // TODO: refactor this; not efficient
      e.appInfos.forEach(a => {
        appNameSet.add(a.name);
        appGroupNameSet.add(a.group);
      });
      // for (const a of e.appInfos.values()) {
      //   if (appGroupNameSet.has(a.group)) {
      //     continue;
      //   }
      //   appGroupNameSet.add(a.group);
      // }
    }

    for (const s of Array.from(appNameSet.values())) {
      console.log(s);
    }

    for (const s of Array.from(appGroupNameSet.values())) {
      console.log(s);
    }
    this.apps = Array.from(appNameSet.values());
    this.appGroups = Array.from(appGroupNameSet.values());
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

  private setDefaultSelections() {
    this.myForm.get("appGroupCtl")?.patchValue("All");
    this.myForm.get("appCtl")?.patchValue("All");
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
    alert(this.myForm.value.appGroupCtl);
  }

  onAppGroupChanged(value: String) {
    console.log('onAppGroupChanged ' + value)
  }
}
