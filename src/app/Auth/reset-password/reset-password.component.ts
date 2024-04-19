import { Component } from '@angular/core';
import { AuthService } from '../Guard/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  password: string = ''
  passwordAgain: string = ""

  constructor(private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  reset(password: string, passwordAgain: string) {
    const userId = this._activatedRoute.snapshot.queryParamMap.get('userId');
    const secret = this._activatedRoute.snapshot.queryParamMap.get('secret');

    if (userId && secret) {
      this._authService.resetPassword(userId, secret, password, passwordAgain).then(() => {
        this._router.navigateByUrl("/sign-in")
      }).catch((e) => {
        alert(`Check Your Password: password don't match`)
      })

    }
  }
}