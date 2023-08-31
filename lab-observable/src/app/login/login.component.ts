import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})


export class LoginComponent {
    public static readonly MIN_CHAR_LENGTH = 5;
    IsAuthenticatiionFailed: boolean;

    loginForm = new FormGroup({
        UserName: new FormControl('', [
            Validators.required,
            Validators.minLength(LoginComponent.MIN_CHAR_LENGTH),
        ]),
        Password: new FormControl('', [
            Validators.required,
            Validators.minLength(LoginComponent.MIN_CHAR_LENGTH),
        ]),
    });

    constructor(private authService: AuthenticationService, private router: Router, private httpClient: HttpClient) {
        this.IsAuthenticatiionFailed = false;
    }

    login() {
        this.authService
            .authenticate(this.loginForm.value);

        // this.httpClient.post("http://localhost:4000/signin", this.loginForm.value).subscribe(response => {
        //     let dataJson = JSON.parse(JSON.stringify(response));
        //     if (dataJson.token == undefined) {
        //         this.IsAuthenticatiionFailed = true;
        //     } else {
        //         this.router.navigate(['customer']);
        //         localStorage['token'] = dataJson.token;
        //     }
        // });
    }

    FailsRequired(inputName: string): boolean {
        let f = this.loginForm.get(inputName);
        return !(f?.dirty && f.errors?.['required']);
    }

    FailsMinChar(inputName: string): boolean {
        let f = this.loginForm.get(inputName);
        return !(f?.dirty && f.errors?.['minlength']);
    }
}
