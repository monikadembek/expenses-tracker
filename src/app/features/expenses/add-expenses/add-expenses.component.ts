import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ExpenseCategory } from '../models/ExpenseCategory';
import { ExpensesService } from '../services/expenses.service';
import { from } from 'rxjs';
import { Expense } from '../models/Expense';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})
export class AddExpensesComponent implements OnInit {

  @ViewChild('formDirective', {static: true}) private formDirective: NgForm;
  addExpenseForm: FormGroup;
  date: string;
  expenseCategory = ExpenseCategory;

  constructor(private fb: FormBuilder,
              private expensesService: ExpensesService) { }

  ngOnInit() {
    this.date = this.getDate();
    this.addExpenseForm = this.createForm();
    console.log(this.addExpenseForm);
  }

  save(form: FormGroup): void {
    console.log(form);
    console.log(form.value);
    if (form.dirty && form.valid) {
      this.expensesService.insertExpenseIntoDb(form.value).subscribe(
        () => {
          this.clearForm();
        }
      );
    }
  }

  private getDate(): string {
    let date: string;
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const displayedMonth = month < 9 ? `0${month}` : `${month}`;
    date = `${currentDate.getFullYear()}-${displayedMonth}-${currentDate.getDate()}`;
    console.log(date);
    return date;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      value: [0, [Validators.required]],
      date: [this.date, [Validators.required]],
      category: ['other', [Validators.required]],
    });
  }

  private clearForm(): void {
    this.formDirective.resetForm({
      title: '',
      value: 0,
      date: this.date,
      category: 'other'
    });
  }

}
