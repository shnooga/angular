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
  private readonly envs: Array<Env>;
  apps!: String[];
  appGroups!: String[];
  appGroupToEnvsMap = new Map<String, Array<Env>>;
  displayEnvs = new Array<Env>();
  @ViewChild('submitBtn') submitBtn: any;

  // contactForm! means will be set later
  readonly myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.envs = JSON.parse(ENV_INFOS) as Array<Env>;
    this.poplulateAppCtl(this.envs);
    this.populateAppGroupCtl();
    this.populateAppGroupToEnvsMap();

    this.myForm = this.fb.group({
      appGroupCtl: [null],
      appCtl: [null]
    });

    this.myForm.get("appGroupCtl")?.valueChanges
      .subscribe(f => {
        this.onAppGroupChanged(f);
      })
    this.myForm.get("appCtl")?.valueChanges
      .subscribe(f => {
        this.onAppChanged(f);
      })

    this.setDefaultSelections();
  }

  private populateAppGroupCtl() {
    const appGroupNameSet = new Set<String>();
    for (const e of this.envs) {
      // TODO: refactor this; not efficient
      e.appInfos.forEach(a => {
        appGroupNameSet.add(a.group);
        console.log(a.group);
      });
      this.appGroups = Array.from(appGroupNameSet.values());
      this.appGroups.splice(0, 0, "All");
    }
  }

  private poplulateAppCtl(myEnvs: Env[] | undefined) {
    if(typeof myEnvs === "undefined") {
      return;
    }
    const appNameSet = new Set<String>();
    for (const e of myEnvs) {
      // TODO: refactor this; not efficient
      e.appInfos.forEach(a => {
        appNameSet.add(a.name);
        console.log(a.name);
      });
    }
    this.apps = Array.from(appNameSet.values());
    this.apps.splice(0, 0, "All");
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
      }
    }
    console.log("done");
  }

  private setDefaultSelections() {
    // 2 ways of retrieving the control of interest
    this.myForm.get("appGroupCtl")?.patchValue("All");
    this.myForm.controls['appCtl'].patchValue("All");
  }

  onLoad() {
    alert(this.myForm.value.appGroupCtl + " " + this.myForm.value.appCtl);
    const appGroupName = this.myForm.controls['appGroupCtl'].value;
    const appName = this.myForm.controls['appCtl'].value;
    if (appName === "All" && appGroupName === "All") {
      alert("Too large of a search, please narrow by making a selection.")
      return;
    }

    const mySubmitBtn = document.getElementById("myBtn") as HTMLButtonElement
    mySubmitBtn.disabled = true;
    mySubmitBtn.disabled = false;


    // const myEnvs = (appGroupName === "All") ? this.envs : this.appGroupToEnvsMap.get(appGroupName);
  }

  private onAppChanged(appName: String) {
    const appGroupName = this.myForm.controls['appGroupCtl'].value;
    // this.submitBtn.nativeElement.disabled = (appGroupName === 'All' && appName === 'All');
  }

  private onAppGroupChanged(appGroupName: String) {
    console.log('onAppGroupChanged ' + appGroupName)
    if (appGroupName === "All") {
      return;
    }
    const myEnvs = (appGroupName === "All") ? this.envs : this.appGroupToEnvsMap.get(appGroupName);

    // if (appGroupName === "All") {
    //   this.myForm.controls['appCtl'].disable();
    // } else {
    //   this.myForm.controls['appCtl'].enable();
    // }

    this.poplulateAppCtl(myEnvs);
    if (this.apps.length == 2) {
      // Remove the "All" selection since there is only 1 real selection choice
      this.apps.shift();
    }
    this.myForm.get("appCtl")?.patchValue(this.apps[0]);
  }

  //TODO refactor as service calls
  // callVersionEndpoints()

}
