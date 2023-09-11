import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../model/customer';
import { JsonCustomer } from '../model/jsoncustomer';
import {AppConfigService} from "./app-config.service";

@Injectable()
export class CustomerService {
    private IsAddNewSubject: BehaviorSubject<boolean>;
    IsAddNew$: Observable<boolean>;
    private CustomersSubject: Subject<Array<Customer>>;
    Customers$: Observable<Array<Customer>>;
    constructor(private appConfigService: AppConfigService, private httpClient: HttpClient) {
        this.IsAddNewSubject = new BehaviorSubject<boolean>(false);
        this.IsAddNew$ = this.IsAddNewSubject.asObservable();
        this.CustomersSubject = new Subject<Array<Customer>>();
        this.Customers$ = this.CustomersSubject.asObservable();
        this.LoadCustomers();
    }

    private LoadCustomers(): void{
        this.httpClient
            // .get<Array<CustomerItemResponse>>(`${this.appConfigService.apiUrl}/customers`)
            .get<Array<JsonCustomer>>(`http://localhost:4000/customers`, {headers: {'x-access-token': localStorage['token']}})
            .pipe(
                map(jsonCusts => { return this.jsonCustomerToCustomer(jsonCusts); })
            )
            .subscribe(x => { this.CustomersSubject.next(x); });
    }

    private jsonCustomerToCustomer(jsonCustomers: Array<JsonCustomer>): Customer[]{
        return jsonCustomers.map(jc => new Customer(jc.firstName, jc.lastName));
    }

    setAddNew() { this.IsAddNewSubject.next(true); }

    setList() { this.IsAddNewSubject.next(false); }

    Save(c: Customer) {
        this.httpClient
            // .post(`${this.appConfigService.apiUrl}/customers`, newCustomer)
            .post(`http://localhost:4000/customers`,
                    new JsonCustomer(c.FName, c.LName ),
                { headers: {'x-access-token': localStorage['token']}}
            )
            .subscribe(() => {
                this.LoadCustomers();
                this.IsAddNewSubject.next(false);
            });
    }
}
