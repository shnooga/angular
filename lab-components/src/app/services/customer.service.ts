import {Injectable} from "@angular/core";
import {Customer} from "../model/customer";
import {BehaviorSubject, map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Customerinfo} from "../model/customerinfo";

@Injectable()
export class CustomerService {
    private CustomersSubject= new Subject<Array<Customer>>();
    private IsAddNewSubject = new BehaviorSubject<boolean>(false);

    Customers$ = this.CustomersSubject.asObservable();
    IsAddNew$ = this.IsAddNewSubject.asObservable();

    constructor(private httpClient: HttpClient) {
        this.LoadCustomers();
    }

    private LoadCustomers() {
        this.httpClient.get<Array<Customerinfo>>(
            'http://localhost:4000/customers',
            {headers: {'x-access-token': localStorage.token}})
            .pipe(map(response => {
                return response.map(c => new Customer(c.firstName, c.lastName));
            }))
            .subscribe(x => {
                this.CustomersSubject.next(x);
            });
    }

    setAddNew() {
        this.IsAddNewSubject.next(true);
    }

    setList() {
        this.IsAddNewSubject.next(false);
        this.LoadCustomers();
    }

    Save(customer: Customer) {
        this.httpClient
            .post(
                'http://localhost:4000/customers',
                new Customerinfo(customer.FName, customer.LName),
                {headers: {'x-access-token': localStorage.token}})
            .subscribe(()=> {
                this.LoadCustomers();
                this.IsAddNewSubject.next(false);
            })
    }
}
