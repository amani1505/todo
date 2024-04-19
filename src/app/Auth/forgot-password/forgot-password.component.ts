import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Guard/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private _authservice: AuthService, private _router: Router) { }

  forget(email: string) {
    this._authservice.forgetPassword(email).then(() => {
      this._router.navigateByUrl("check-email")
    })
  }
}
