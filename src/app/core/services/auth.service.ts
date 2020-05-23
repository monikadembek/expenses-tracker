import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Credentials } from '../models/credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private fireAuth: AngularFireAuth,
              private router: Router) { }

  // AuthState is a stream which emits logged in user
  // if user logs out it will emit null
  authState$: Observable<User | null> = this.fireAuth.authState;

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

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

}
