import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, share } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventManager {

    private observable: Observable<any>;
    private observer: Observer<any>;

    constructor() {
        this.observable = Observable.create(observer => {
            this.observer = observer;
        }).pipe(share());
    }

    broadcast(name: string, data?: any) {
        if (this.observer != null) {
            this.observer.next({ name, data });
        }
    }

    subscribe(eventName, callback): Subscription {
        return this.observable.pipe(filter((event) => event.name === eventName)).subscribe(event => callback(event.data));
    }

    destroy(subscriber: Subscription) {
        subscriber.unsubscribe();
    }
}
