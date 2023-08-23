import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router:Router,
    private _toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  hide = true;
  isLoading:boolean=false
  registerForm!: FormGroup;
  createForm(): void {
    this.registerForm = this._formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/(com|net)$/)]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)],
      ],
      age: ['', [Validators.required]],
    });
  }
  handleRegisterForm(registerForm: FormGroup): void {
    this.isLoading = true
    if (registerForm.valid) {
      this._authService.register(registerForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          if (res.message === 'success') {
            this.isLoading = false
            this._toastr.success(res.message,'successful registration')
            this._router.navigate(['/login'])
          }else{
            this.isLoading = false
            this._toastr.warning(res.message)

          }
        },
     
        
      });
    }
  }
}
