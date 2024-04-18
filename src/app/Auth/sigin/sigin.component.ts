import { Component } from '@angular/core';
import { AuthService } from '../Guard/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.scss'
})
export class SiginComponent {
    email: string = '';
   password: string = '';
constructor(private _authService:AuthService, private _activatedRoute: ActivatedRoute, private _router: Router){}

login(email:string,password:string){
  this._authService.signIn(email,password).subscribe({
    next:(response)=>{
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
      this._router.navigateByUrl(redirectURL);
    },
    error:(error)=>{
      alert(`Error have Occured: ${error}`)
    }
  })
}
}