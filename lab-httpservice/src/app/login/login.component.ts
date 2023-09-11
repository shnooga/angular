import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
})


export class LoginComponent {
    public static readonly MIN_CHAR_LENGTH = 5;

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

    constructor(private authService: AuthenticationService) {
    }

    login() {
        this.authService.authenticate(this.loginForm.value);
    }

    failsRequired(inputName: string): boolean {
        let f = this.loginForm.get(inputName);
        return !(f?.dirty && f.errors?.['required']);
    }

    failsMinChar(inputName: string): boolean {
        let f = this.loginForm.get(inputName);
        return !(f?.dirty && f.errors?.['minlength']);
    }

    failsLogin() : boolean {
        return (localStorage['error'] === undefined);
    }
}
