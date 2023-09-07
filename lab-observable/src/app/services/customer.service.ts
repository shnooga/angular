import {Injectable} from "@angular/core";
import {Customer} from "../model/customer";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";


@Injectable()
export class CustomerService {

    private Customers: Array<Customer>;
    private IsAddNewSubject: Subject<boolean>;
    IsAddNew$: Observable<boolean>;
    Customers$: Observable<Array<Customer>>;

    constructor() {
        this.IsAddNewSubject = new BehaviorSubject<boolean>(false);
        this.IsAddNew$ = this.IsAddNewSubject.asObservable();

        this.Customers = new Array<Customer>();
        this.Customers.push(new Customer('Clark', 'Kent'));
        this.Customers.push(new Customer('Tony', 'Stark'));
        this.Customers.push(new Customer('Peter', 'Parker'));
        this.Customers$ = of(this.Customers);
    }

    setAddNew() {
        this.IsAddNewSubject.next(true);
    }

    setList() {
        this.IsAddNewSubject.next(false);
    }

    Save(customer: Customer) {
        this.Customers.push(customer);
        // Notify subscriber; don't need to notify customer list since it's arrays are passed by reference
        this.IsAddNewSubject.next(false);
    }
}
