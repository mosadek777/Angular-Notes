import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalModule } from '@sweetalert2/ngx-sweetalert2/lib/sweetalert2-loader.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router:Router,
    private _toastr:ToastrService,
   
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  hide = true;
  isLoading:boolean=false
  loginForm!: FormGroup;
  createForm(): void {
    this.loginForm = this._formBuilder.group({
 
   
      email: ['', [Validators.required, Validators.pattern(/(com|net)$/)]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)],
      ],
    
    });
  }
  handleloginForm(loginForm: FormGroup): void {
    this.isLoading = true
    if (loginForm.valid) {
      this._authService.login(loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.isLoading = false
            localStorage.setItem("userToken",res.token)
            this._authService.userData()
            this._toastr.success(res.message)
            this._router.navigate(['/home'])
          }else{
            
            this.isLoading = false
            this._toastr.warning(res.message)

          }
        }
     
        
      }
    
      )
      
    }
  }
}
