import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from "@angular/router";
import { Injectable} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated() || this.authService.isTokenExpired()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

}
