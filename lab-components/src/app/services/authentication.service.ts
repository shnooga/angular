import {AuthenticationResponse} from "../model/AuthenticationResponse";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {AppConfigService} from "./appconfig.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private appConfigService: AppConfigService,private router: Router, private httpClient: HttpClient) {
    }

    authenticate(user: User) {
        this.httpClient
            .post<AuthenticationResponse>(`${this.appConfigService.apiUrl}/signin`, user)
            // .subscribe( r => this.handleNext(r)); // Short hand for next only.
            .subscribe({
                next: (r: AuthenticationResponse) => this.handleNext(r),
                error: (e: Error) => this.handleError(e.message),
                complete: () => console.log("Stream completed")
            });
    }

    /*
    authenticate(user: User): void {
        // Change no 3 - Observable is subscribed
        this.httpClient
            .post<AuthenticationResponse>( `${this.appConfigService.apiUrl}/signin`, user)
            .subscribe((response: { token: string }) => {
            if (response.token !== undefined) {
                localStorage.token = response.token;
                this.router.navigate(['customer']);
            }else{
                // Change 5 - Notify subscriber that credentials are invalid
                this.isAuthenticationFailedSubject.next(true);
            }
        });
    }
    */

    private handleNext(response: AuthenticationResponse) {
        if (response.token !== undefined) {
            localStorage['token'] = response.token;
            localStorage['error'] = undefined;
            this.router.navigate(['customer']);
        }
        if (response.error !== undefined) {
            console.log(response.error);
            this.handleError(response.error);
        }
    }

    private handleError(error: String) {
        localStorage['error'] = error;
        console.log(error);
    }

    isAuthenticated() : boolean {
        const token = localStorage['token'];
        return token != null && token != undefined;
    }

    isTokenExpired() : boolean {
        const helper = new JwtHelperService();
        return <boolean>helper.isTokenExpired(localStorage['token']);
    }

    logout() {
        localStorage.clear();
    }
}
