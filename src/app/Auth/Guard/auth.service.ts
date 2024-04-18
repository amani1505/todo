import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, throwError } from 'rxjs';
import { account, teams } from '../../../lib/appwrite';
import { UserService } from '../Users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(private _userService: UserService) { }

  set token(token: any) {
    localStorage.setItem('accessToken', token);
  }

  get token(): any {
    return localStorage.getItem('accessToken') ?? '';
  }

  signIn(email: string, password: string): Observable<any> {
    return from(account.createEmailSession(email, password)).pipe(
      switchMap(() => from(account.createJWT())),
      switchMap(token => {
        this.token = token.jwt;
        return from(account.get());
      }),
      switchMap(user => {
        this._userService.user = user;
        this._authenticated = true;
    
        return of(true); // Emit true to indicate successful sign-in
      })
    );
  }

  check(): Observable<boolean> {
  
    return of(this._authenticated);
  }
}
