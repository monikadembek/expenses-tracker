import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/Expense';
import { ExpenseTimespan } from '../models/enums';
import { Subject, Observable, from, of, combineLatest, concat } from 'rxjs';
import { takeUntil, map, startWith, take, delay, tap, switchMap, skipUntil, filter, takeWhile, skipWhile } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { ExpenseCategory } from '../models/ExpenseCategory';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit, OnDestroy {

  // unSubscribe$ = new Subject();

  expenses$: Observable<Expense[]> = of([]);
  sumOfExpenses$: Observable<number>;
  editState = false;
  editItemIndex: number;
  addExpenseForm: FormGroup;
  expenseCategory = ExpenseCategory;
  // timespan = ExpenseTimespan;

  @ViewChild('formDirective', {static: true}) private formDirective: NgForm;

  constructor(private fb: FormBuilder,
              private expensesService: ExpensesService) {}

  ngOnInit(): void {
    // check store and init only if there are no values in store
    if (this.expensesService.getAllExpensesFromStore().expenses.length === 0) {
      console.log('must init store - get from db');
      this.initStore();
    } else {
      console.log('store initialized');
      this.displayAllExpenses();
    }

    this.getSumOfExpenses();
    this.addExpenseForm = this.createForm();
  }

  initStore(): void {
    this.expenses$ = concat(
      this.expensesService.getAllExpensesFromDb(),
      this.expensesService.getAllExpenses()
    );
  }

  displayAllExpenses() {
    console.log('get from store');
    this.expenses$ = this.expensesService.getAllExpenses();
  }

  displayEditForm(expense: Expense, index: number): void {
    console.log('edit: ', expense);
    this.editState = true;
    this.editItemIndex = index;
    this.patchEditForm(expense.title, expense.value, expense.date, expense.category);
  }

  cancelEdit(): void {
    this.editState = false;
    this.editItemIndex = null;
  }

  editExpense(form: FormGroup, expenseId: string): void {
    console.log(form);
    console.log(form.value);
    const editedExpense = {
      id: expenseId,
      ...form.value
    };
    if (form.dirty && form.valid) {
      this.expensesService.editExpenseInDb(editedExpense).subscribe(
        () => {
          this.cancelEdit();
          this.initStore();
        }
      );
    }
  }

  delete(expense: Expense): void {
    console.log('delete: ', expense);
    this.expensesService.deleteExpenseFromDb(expense.id).subscribe(data => {
      console.log('Deleted item with id: ', expense.id);
      this.initStore();
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      value: [0, [Validators.required]],
      date: ['2020-07-07', [Validators.required]],
      category: ['other', [Validators.required]],
    });
  }

  private patchEditForm(title: string, value: number, date: any, category: string): void {
    this.addExpenseForm.patchValue({
      title,
      value,
      date,
      category,
    });
  }

  filterExpenses(e: MatButtonToggleChange): void {
    console.log('event from matToggleGroup: ', e);
    switch (e.value) {
      case 'currentMonth':
        this.displayCurrentMonthExpenses();
        break;
      case 'lastMonth':
        this.displayLastMonthExpenses();
        break;
      case 'lastFew':
        this.displayLastNumberOfExpenses();
        break;
      case 'all':
        this.displayAllExpenses();
        break;
      default:
        this.displayAllExpenses();
    }
    this.getSumOfExpenses();
  }

  private displayLastNumberOfExpenses(): Observable<Expense[]> {
    const numOfExpenses = 5;
    return this.expenses$ = this.expensesService.getLastNumberOfExpenses(numOfExpenses);
  }

  private displayCurrentMonthExpenses(): Observable<Expense[]> {
    const currentMonthDate = new Date().toISOString();
    return this.expenses$ = this.expensesService.getSelectedMonthExpensesFromDB(currentMonthDate);
  }

  private displayLastMonthExpenses(): Observable<Expense[]> {
    const lastMonth = new Date().getMonth() - 1;
    const lastMonthDate = new Date().setMonth(lastMonth);
    const lastMonthDateString = new Date(lastMonthDate).toISOString();
    return this.expenses$ = this.expensesService.getSelectedMonthExpensesFromDB(lastMonthDateString);
  }

  private getSumOfExpenses()  {
    this.sumOfExpenses$ = this.expenses$.pipe(
      tap(expenses => console.log('1. in tap in getSumExpenses fn ', expenses)),
      switchMap((expenses: Expense[]) => this.sumValues(expenses))
    );
  }

  private sumValues(expenses: Expense[]): Observable<number> {
    let sum = 0;
    expenses.forEach(expense => sum = sum + expense.value);
    console.log('sum = ', sum);
    return of(sum);
  }

  ngOnDestroy() {
    // this.unSubscribe$.next();
    // this.unSubscribe$.complete();
    // console.log('unsubscribed from getAllExpensesFromDbObservable');
  }
}
