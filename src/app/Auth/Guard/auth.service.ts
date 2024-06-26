import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
import { account, ID, teams } from '../../../lib/appwrite';
import { UserService } from '../Users/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(private _userService: UserService, private _httpClient: HttpClient) { }

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
     
        if (user.emailVerification === true) {
          this._userService.user = user;
          this._authenticated = true;
          return of(true); // Emit true to indicate successful sign-in
        } else {
          this._authenticated = false;
          return throwError('Please Check your email For verificatication');
        }
      }),
      catchError(error => {
        
        return throwError('Please check your password or email');
      })
    );
  }
  async signup(email: string, password: string, name: string) {
    const user = await account.create(ID.unique(), email, password, name,);
    await account.createEmailSession(email, password)
    await account.createVerification("https://todo-project-one.netlify.app/verify-account")


  }
  updateVerification(userId: string, secret: string,): Observable<any> {
    return from(account.updateVerification(userId, secret).then((authenticated) => {

      this._authenticated = true

    }).catch((e) => {
      alert('unsuccessfull verification')
      this._authenticated = false
    }));
  }
  async forgetPassword(email: string) {
    await account.createRecovery(email, "https://todo-project-one.netlify.app/reset-password")

  }
  async resetPassword(userId: string, secret: string, password: string, passwordAgain: string) {
    await account.updateRecovery(userId, secret, password, passwordAgain)
  }
  async signOut(): Promise<Observable<any>> {
    localStorage.removeItem('accessToken');

    await account.deleteSession('current');
    this._userService.user = null;
    this._authenticated = false;
    return of(true);
  }


  check(): Observable<boolean> {
    return from(account.get()).pipe(
      switchMap(user => {
        this._userService.user = user;
        this._authenticated = true;
        return of(true);
      }),
      catchError(error => {
        alert(`User not authenticated`);
        return of(false);
      })
    );
  }
}
