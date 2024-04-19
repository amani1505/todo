import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Guard/auth.service';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent {
  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { 
    this.verifyAccount();
  }

  verifyAccount() {
    const userId = this._activatedRoute.snapshot.queryParamMap.get('userId');
    const secret = this._activatedRoute.snapshot.queryParamMap.get('secret');

    if (userId && secret) {
      this._authService.updateVerification(userId, secret).subscribe({
        next: () => {
          console.log("Verified Well")
          // Redirect to the todo route after verification
          this._router.navigate(['/todo']);
        },
        error: (error) => {
          alert(`Error verifying account: ${error}`);
          // Handle error as needed
        }
      });
    } else {
      alert('Missing userId or secret');
      // Handle missing parameters error
    }
  }
}
