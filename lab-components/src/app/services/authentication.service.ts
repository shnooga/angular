import {AuthenticationResponse} from "../model/AuthenticationResponse";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private router: Router, private httpClient: HttpClient) { }

    authenticate(user: User) {
        this.httpClient
            .post<AuthenticationResponse>('http://localhost:4000/signin', user)
            // .subscribe( r => this.handleNext(r)); // Short hand for next only.
            .subscribe({
                next: (r: AuthenticationResponse) => this.handleNext(r),
                error: (e: Error) => this.handleError(e.message),
                complete: () => console.log("Stream completed")
            });
    }

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
