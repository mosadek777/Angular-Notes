import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

userDetails:BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _router:Router,private _toaster:ToastrService) { 
    this.userData()
  }


  register(FormData:object):Observable<any>{
  return this._HttpClient.post(environment.baseUrl + 'signup' , FormData)
  }


  
  login(FormData:object):Observable<any>{
    return this._HttpClient.post(environment.baseUrl + 'signin' , FormData)
    }

    userData():void{
      let token = localStorage.getItem("userToken")
      if (token !== null) {
        let decodedToken = jwtDecode(token)
        this.userDetails.next(decodedToken)
        this._router.navigate(['/home'])
      }
     
    }



    logOut():void{
      localStorage.removeItem("userToken")
      this.userDetails.next(null)
      this._router.navigate(['/login'])
      this._toaster.info("bye👋👋👋","see you next time")
    }
}
