import {AuthenticationResponse} from "../model/httpresponses/AuthenticationResponse";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    constructor(private router: Router, private httpClient:HttpClient) { }

    authenticate(user:User) {
        this.httpClient
            .post<AuthenticationResponse>('http://localhost:4000/signin', user)
            .subscribe((response: { token: string}) => {
                if(response['token'] !== undefined) {
                    localStorage['token'] = response['token'];
                    this.router.navigate(['customer']);
                }
        });
    }

    isAuthenticated(): boolean {
        const token = localStorage['token'];
        return token != null && token != undefined;
    }

    isTokenExpired(): boolean {
        const helper = new JwtHelperService();
        return <boolean>helper.isTokenExpired(localStorage['token']);
    }

    logout() {
        localStorage.clear();
    }
}
