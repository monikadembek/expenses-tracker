import { ExpenseCategory } from './ExpenseCategory';

export interface Expense {
    id: string;
    title: string;
    value: number;
    date: Date;
    category: ExpenseCategory;
}

