import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
username:string;
constructor(){


}
ngOnInit(){
  this.username=localStorage.getItem('username')

}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
