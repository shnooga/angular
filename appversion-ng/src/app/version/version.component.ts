import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Observable} from "rxjs";
import jwt_decode from 'jwt-decode';
import {Env} from "../model/Env";
import {ENV_INFOS} from "../model/global";
import {AppInfo} from "../model/AppInfo";

@Component({
  selector: 'version',
  templateUrl: './version.component.html'
})

export class VersionComponent implements OnInit {
  // envs! means will be set later
  envs!: Array<Env>;
  apps!: String[];
  appGroups!: String[];
  // The envs will only have app infos belonging to the corresponding appGroup
  appGroupToFilteredEnvsMap!: Map<String, Array<Env>>;

  readonly myForm!: FormGroup;
  envCtl!: AbstractControl;
  appCtl!: AbstractControl;
  appGroupCtl!: AbstractControl;
  submitBtn: any;

  // @ViewChild('submitBtn') submitBtnChild: any;


  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      envCtl: [null],
      appGroupCtl: [null],
      appCtl: [null]
    });
  }

  ngOnInit() {
    this.envCtl = this.myForm.controls['envCtl'];
    this.appGroupCtl = this.myForm.controls['appGroupCtl'];
    this.appCtl = this.myForm.controls['appCtl'];
    this.submitBtn = document.getElementById("myBtn") as HTMLButtonElement;

    // this.myForm.get("appGroupCtl")?.valueChanges
    this.appGroupCtl.valueChanges.subscribe(f => { this.onAppGroupChanged(f); })
    // this.myForm.get("appCtl")?.valueChanges
    this.appCtl.valueChanges.subscribe(f => { this.onAppChanged(f); })

    this.envs = JSON.parse(ENV_INFOS) as Array<Env>;
    this.poplulateAppCtl(this.envs);
    this.populateAppGroupCtl();
    this.populateAppGroupToFilteredEnvsMap();
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

  private populateAppGroupToFilteredEnvsMap() {
    let envSelected = (this.envCtl.value == undefined) ? "All" : this.envCtl.value.name;

    this.appGroupToFilteredEnvsMap = new Map<String, Array<Env>>;
    for(const appGroup of this.appGroups) {
      this.appGroupToFilteredEnvsMap.set(appGroup, new Array<Env>);
    }

    for(const appGroup of this.appGroups) {
      for(const e of this.envs) {
        // Filter out unwanted environs
        if (envSelected !== "All" && envSelected !== e.name) {
          continue;
        }

        const nuEnv = new Env();
        nuEnv.name = e.name;
        nuEnv.appInfos = new Array<AppInfo>;

        // Filter out Apps in unwanted App Group
        for(const a of e.appInfos) {
          if (a.group === appGroup) {
            nuEnv.appInfos.push(a);
          }
        }
        this.appGroupToFilteredEnvsMap.get(appGroup)?.push(nuEnv);
      }
    }
  }

  private setDefaultSelections() {
    // 3 ways of retrieving the control of interest
    this.envCtl.patchValue("All");
    this.myForm.get("appGroupCtl")?.patchValue("All");
    this.myForm.controls['appCtl'].patchValue("All");
  }

  onLoad() {
    // alert("Env: \"" + this.envCtl.value.name + "\" App Group: \"" + this.appGroupCtl.value + "\" App: " + this.appCtl.value + "\"");
    console.log("Env: \"" + this.envCtl.value.name + "\" App Group: \"" + this.appGroupCtl.value + "\" App: \"" + this.appCtl.value + "\"");

    if (this.appCtl.value === "All" && this.appGroupCtl.value === "All") {
      alert("Too large of a search, please narrow by making a selection.")
      this.submitBtn.disabled = true;
      return;
    }
    this.populateAppGroupToFilteredEnvsMap();
    console.log("blah");
    // this.submitBtn.disabled = false;
  }

  private onAppGroupChanged(appGroupName: String) {
    this.submitBtn.disabled = (this.appCtl.value === "All" && appGroupName === "All");
    if (appGroupName === "All") { return; }

    this.submitBtn.disabled = false;
    const myEnvs = (appGroupName === "All") ? this.envs : this.appGroupToFilteredEnvsMap.get(appGroupName);

    this.poplulateAppCtl(myEnvs);
    if (this.apps.length == 2) {
      // Remove the "All" selection since there is only 1 real selection choice
      this.apps.shift();
    }
    this.appCtl.patchValue(this.apps[0]);
  }

  private onAppChanged(appName: String) {
    this.submitBtn.disabled = (this.appCtl.value === "All" && this.appGroupCtl.value === "All");
  }

  //TODO refactor as service calls
  // callVersionEndpoints()

}
