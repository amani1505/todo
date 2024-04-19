import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { account } from '../../../lib/appwrite';
import { AuthService } from '../Guard/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  name:string =''

  constructor(private _authService:AuthService,private _router:Router){}
  signup(email:string,password:string,name:string){
  this._authService.signup(email,password,name).then(()=>{
    this._router.navigateByUrl('/check-email')

  })
  }

}
