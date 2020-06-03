import { Injectable } from '@angular/core';
import { Store } from '../store/store';
import { AuthState } from './auth-state';

@Injectable({
    providedIn: 'root'
})
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(new AuthState());
    }
}