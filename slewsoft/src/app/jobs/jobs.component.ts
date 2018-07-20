import { Component, OnInit } from '@angular/core';
import { Job } from '../job';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {
  jobs: Job[];

  constructor(private heroService: JobService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getJobs()
      .subscribe(jobs => this.jobs = jobs);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addJob({ name } as Job)
      .subscribe(hero => {
        this.jobs.push(hero);
      });
  }

  delete(job: Job): void {
    this.jobs = this.jobs.filter(h => h !== job);
    this.heroService.deleteJob(job).subscribe();
  }
}
