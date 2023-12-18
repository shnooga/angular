import {Component} from "@angular/core";
import {AppConfigService} from "../services/appconfig.service";
import {HttpClient} from "@angular/common/http";


@Component({
    selector:'error-test',
    templateUrl: './errortest.component.html',
})

export class ErrorTestComponent {
    constructor(private appConfigService: AppConfigService, private httpClient: HttpClient) {
    }

    throwClientError() {
        throw new Error('esting client side error !!!');
    }

    throwServerError() {
        this.httpClient
            .get(`${this.appConfigService.apiUrl}/getError)`)
            .subscribe();
    }

    throwUnauthorizedError() {
        this.httpClient
            .get(`${this.appConfigService.apiUrl}/authTest`)
            .subscribe();
    }

}
