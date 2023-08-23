import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard:CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => { 
 
 const auth = inject(AuthService)
 const _router = inject(Router)
 
 if (auth.userDetails.getValue() !== null) {
  return true;
 } else {
  _router.navigate(['/login'])
  return false;

 }
 
   
}
