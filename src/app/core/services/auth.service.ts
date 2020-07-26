import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { auth } from 'firebase/app';
import { Observable, EMPTY } from 'rxjs';
import { Credentials } from '../models/credentials';
import { Router } from '@angular/router';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { AuthState } from './auth-state';
import { AuthStore } from './auth-store';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from '../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private fireAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private authStore: AuthStore,
              private router: Router) { }

  // AuthState is a stream which emits logged user
  // if user logs out it will emit null
  authState$: Observable<User | null> = this.fireAuth.authState;

  // get user(): User | null {
  //   return this.fireAuth.auth.currentUser;
  // }

  login({ email, password }: Credentials): Promise<any> {
    const session = auth.Auth.Persistence.SESSION;
    return this.fireAuth.auth.setPersistence(session).then(() => {
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    });
  }

  register({ email, password }: Credentials): Promise<any> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithGoogle(): Promise<any> {
    return this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  setAuthState(): Observable<void> {
    return this.authState$.pipe(
      tap(data => console.log('Tap data: ', data)),
      filter((state: User | null) => state !== null),
      map((state: User) => {
        console.log('State in map before setState fn: ', state);
        const authState: AuthState = {
          uid: state.uid,
          email: state.email,
          providerId: state.providerId,
          displayName: state.displayName
        };
        this.authStore.setState(authState);
      })
    );
  }

  insertUserIntoDb(user: UserData) {
    this.afs.collection('users').doc(user.userId).set(user);
  }

}
