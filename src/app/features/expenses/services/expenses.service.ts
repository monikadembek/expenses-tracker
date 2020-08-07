import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Expense } from '../models/Expense';
import { AuthStore } from 'src/app/core/services/auth-store';
import { ExpensesStore } from './expenses-store';
import { from, Observable } from 'rxjs';
import { first, tap, map } from 'rxjs/operators';
import { ExpensesState } from './expenses-state';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private afs: AngularFirestore,
              private authStore: AuthStore,
              private expensesStore: ExpensesStore) { }

  get userId() {
    return this.authStore.state.uid;
  }

  insertExpenseIntoDb(expense: Expense): Observable<any> {
    console.log('expense added to db');
    // return from(this.afs.doc(`users/${userId}`).set(expense));
    return from(this.afs.collection(`users/${this.userId}/expenses`).add(expense));
  }

  getAllExpensesFromDb(): Observable<any> {
    return this.afs.collection(`users/${this.userId}/expenses`)
      .snapshotChanges()
      .pipe(
       // tap(snaps => console.log(snaps)),
        tap(() => console.log('subsciption - getAllExpensesFromDb')),
        map(snaps => {
          const expenses: Expense[] = [];
          snaps.map((snap: any) => {
            expenses.push(
            {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
            );
          });
          return expenses;
        }),
        tap((data: Expense[]) => {
          console.log('putting expenses to store - in getAllExpensesFromDB fn');
          this.putExpensesToStore(data);
        }),
        first()
      );
  }

  editExpenseInDb(expense: Expense): Observable<any> {
    console.log('edited expense to be saved in db:', expense);
    return from(this.afs.doc(`users/${this.userId}/expenses/${expense.id}`).update(expense));
  }

  putExpensesToStore(data: Expense[]): void {
    const state = {
      expenses: data
    };
    this.expensesStore.setState(state);
  }

  getAllExpensesFromStoreState(): ExpensesState {
    return this.expensesStore.state;
  }

  getAllExpensesFromStore(): Observable<Expense[]> {
    return this.expensesStore.state$
      .pipe(
        map((state: ExpensesState) => state.expenses),
        tap(() => console.log('subscription - getAllExpensesFromStore'))
      );
  }

  getLastNumberOfExpenses(num: number): Observable<Expense[]> {
    return this.getAllExpensesFromStore().pipe(
      map(expenses => {
        const sortedExpenses: Expense[] = expenses.sort((a, b) => {
          return (new Date(b.date).getTime() - new Date(a.date).getTime());
        });
        console.log('sorted expenses: ', sortedExpenses);
        return sortedExpenses.slice(0, num);
      }),
      tap(() => console.log('subscription - getLastNumberOfExpenses'))
    );
  }

  getSelectedMonthExpensesFromDB(selectedMonthDate: string): Observable<Expense[]> {
    const startSelectedMonthDate = selectedMonthDate.slice(0, 8) + '01';
    const nextMonth = new Date(startSelectedMonthDate).getMonth() + 1;
    const nextMonthDate = new Date().setMonth(nextMonth);
    const startNextMonthDate = new Date(nextMonthDate).toISOString().slice(0, 8) + '01';
    return this.afs.collection(`users/${this.userId}/expenses`,
      ref => ref.where('date', '>=', startSelectedMonthDate).where('date', '<', startNextMonthDate))
      .snapshotChanges()
      .pipe(
       // tap(snaps => console.log(snaps)),
        map(snaps => {
          const expenses: Expense[] = [];
          snaps.map((snap: any) => {
            expenses.push(
            {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
            );
          });
          return expenses;
        }),
        first(),
        tap(() => console.log('subscription - getSelectedMonthExpenseFromDb'))
      //  tap(data => console.log('data from expenses store: ', this.expensesStore.state, data))
      );
  }

  getExpensesForDatesFromDB(fromD: string, toD: string): Observable<Expense[]> {
    console.log(new Date(fromD).toISOString(), new Date(toD).toISOString());
    const dateFrom = new Date(fromD).toISOString().slice(0, 10);
    const dateTo = new Date(toD).toISOString().slice(0, 10);
    console.log(dateFrom, dateTo);
    return this.afs.collection(`users/${this.userId}/expenses`,
      ref => ref.where('date', '>', dateFrom).where('date', '<=', dateTo))
      .snapshotChanges()
      .pipe(
       // tap(snaps => console.log(snaps)),
        map(snaps => {
          const expenses: Expense[] = [];
          snaps.map((snap: any) => {
            expenses.push(
            {
              id: snap.payload.doc.id,
              ...snap.payload.doc.data()
            }
            );
          });
          return expenses;
        }),
        first(),
        tap((data: Expense[]) => console.log('subscription - getExpensesForDatesFromDB', data))
      //  tap(data => console.log('data from expenses store: ', this.expensesStore.state, data))
      );
  }

  deleteExpenseFromDb(id: string) {
    console.log('in expenses.service - delete function');
    return from(this.afs.collection(`users/${this.userId}/expenses`).doc(id).delete());
  }


}
