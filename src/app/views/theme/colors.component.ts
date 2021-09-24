import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsserviceService } from '../../../services/newsservice.service';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  signup: FormGroup;
  isSubmitted:boolean;
  imageSrc=[];
  constructor(@Inject(DOCUMENT) private _document: any,private _newsService:NewsserviceService) {}

  // public themeColors(): void {
  //   Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
  //     const background = getStyle('background-color', el);
  //     const table = this._document.createElement('table');
  //     table.innerHTML = `
  //       <table class="w-100">
  //         <tr>
  //           <td class="text-muted">HEX:</td>
  //           <td class="font-weight-bold">${rgbToHex(background)}</td>
  //         </tr>
  //         <tr>
  //           <td class="text-muted">RGB:</td>
  //           <td class="font-weight-bold">${background}</td>
  //         </tr>
  //       </table>
  //     `;
  //     el.parentNode.appendChild(table);
  //   });
  // }
dataSource=[]
  ngOnInit(): void {
    // this.themeColors();
    this.signup = new FormGroup({
      Title: new FormControl(null, Validators.required),
      Text: new FormControl(null, Validators.required),
  
      image: new FormControl(null, [Validators.required])
    });
this.loadNews();
  }
  get f() { return this.signup.controls; }

  onSubmit() {
    this.isSubmitted=true;
 this.dataSource.push(this.signup.value);
}
onFileChange(event) {
  debugger;
  const reader = new FileReader();
  
  
    
    if(event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
    
      reader.onload = () => {
   
        this.imageSrc.push(reader.result) 
     
        this.signup.patchValue({
          image: reader.result
        });
   
      };
   
    }
 
  
}
  
async loadNews(){
  debugger;
  var newsList = await this._newsService.getNews();
  this.dataSource=newsList.data


}

}
