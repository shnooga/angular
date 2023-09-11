import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  apiUrl: string;

  constructor(private http: HttpClient) {}

  loadConfig(): Promise<void> {
    return this.http
      .get<{apiUrl: string}>('./assets/config.json').toPromise()
      .then(config => {
        if (config) {
          this.apiUrl = config.apiUrl;
        }
      });
  }
}
