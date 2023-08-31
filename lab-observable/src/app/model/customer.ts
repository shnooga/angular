import {AuthenticationService} from "../services/authentication.service";

export class Customer {
  // constructor(private authService: AuthenticationService) { }
  constructor(public FName:string, public LName:string) { }

  logout() {
    // this.authService.logout();
  }
}
