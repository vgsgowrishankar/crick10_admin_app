import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username:string
  password:string

  constructor(private router: Router, private Toastr : ToastrService){


  }

alertsDismiss: any = [];
login(){
  
if(this.username=="admin@cric10.com" && this.password=="admin123"){
  this.router.navigate(['dashboard']);
  this.alertsDismiss.push({
    type: 'info',
    msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  });
localStorage.setItem('username',this.username)

}

}

 }
