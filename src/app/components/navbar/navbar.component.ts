import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
menuName:string = 'Login'
constructor(private _router:Router){
this._router.events.subscribe({
  next:(res)=>{
    if (res instanceof NavigationEnd) {
      this.menuName = res.url.replace('/','')
    }
  }
})
}
}
