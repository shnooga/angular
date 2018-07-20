import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { JobsComponent } from './jobs/jobs.component';
import {JobViewComponent} from './job-view/job-view.component';
import {BoomCalcFormComponent} from './boom-calc-form/boom-calc-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boomcalc', component: BoomCalcFormComponent },
  { path: 'detail/:id', component: JobViewComponent },
  { path: 'jobs', component: JobsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
