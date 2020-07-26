import { Injectable } from '@angular/core';
import { Store } from '../../../core/store/store';
import { ExpensesState } from './expenses-state';

@Injectable({
    providedIn: 'root'
})
export class ExpensesStore extends Store<ExpensesState> {
    constructor() {
        super(new ExpensesState());
    }
}
