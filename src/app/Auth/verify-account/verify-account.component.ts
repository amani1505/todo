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
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Parse URL parameters
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      const secret = params['secret'];
  
      // Call updateVerification function to verify the account
      this.authService.updateVerification(userId, secret, ).subscribe({
        next: () => {
          // Verification successful, redirect to sign-in route
          this.router.navigateByUrl('/sign-in');
        },
        error: (error) => {
          // Handle verification error
          alert(`Failed to verify account: ${error}`);
          // Optionally, redirect to an error page or display an error message
        }
      });
    });
  }
}
