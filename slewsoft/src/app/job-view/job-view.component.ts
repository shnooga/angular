import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {

  @Input() job: Job;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jobService.getJob(id)
      .subscribe(job => this.job = job);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.jobService.updateJob(this.job)
      .subscribe(() => this.goBack());
  }
}
