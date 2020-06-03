import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
    private stateSubject$: BehaviorSubject<T>;
    state$: Observable<T>;

    protected constructor(initialState: T) {
        this.stateSubject$ = new BehaviorSubject(initialState);
        this.state$ = this.stateSubject$.asObservable();
    }

    get state(): T {
        return this.stateSubject$.getValue();
    }

    setState(nextState: T) {
        this.stateSubject$.next(nextState);
    }
}
