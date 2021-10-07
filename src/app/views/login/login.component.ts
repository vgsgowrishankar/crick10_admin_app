import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username:string
  password:string

  constructor(private router: Router){


  }


login(){
if(this.username=="admin@cric10.com" && this.password=="admin123"){
  this.router.navigate(['dashboard']);
localStorage.setItem('username',this.username)

}

}

 }
