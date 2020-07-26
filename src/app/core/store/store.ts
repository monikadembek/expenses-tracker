import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

export class Store<T> {
    // tslint:disable-next-line: variable-name
    private _state$: BehaviorSubject<T>;
    state$: Observable<T>;

    protected constructor(initialState: T) {
        this._state$ = new BehaviorSubject(initialState);
        this.state$ = this._state$.asObservable().pipe(distinctUntilChanged());
    }

    get state(): T {
        return this._state$.getValue();
    }

    setState(nextState: T) {
        this._state$.next(nextState);
    }

    getPartialState<K>(propertyPath: string[]): Observable<K> {
        return this.state$.pipe(
            pluck(...propertyPath),
            distinctUntilChanged<K>()
        );
    }

    // set partial state, modify only selected property
    setPartialState<K>(propertyName: string, partialState: K): void {
        this._state$.next({
            ...this.state,
            [propertyName]: partialState
        });
    }
}
