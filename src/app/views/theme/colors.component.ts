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
  text:string;
  desc:string;
  isSubmitted:boolean;
  hideCOntent:boolean;
  imageSrc=[];
  editSource:any;
  showEdit:boolean
  editnewsform: any;
  id: any;
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
    this.hideCOntent=true
    // this.themeColors();
    this.signup = new FormGroup({
      Title: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      //image: new FormControl(null, [Validators.required])
    });
    this.editnewsform = new FormGroup({
      Title: new FormControl(null, Validators.required),
      Description: new FormControl(null, Validators.required),
      //image: new FormControl(null, [Validators.required])
    });
this.loadNews();
  }
  get f() { return this.signup.controls; }
  get f1() { return this.editnewsform.controls; }

  async onSubmit() {
debugger;
let payload={
  "Title": this.signup.get('Title').value,
  "Description": this.signup.get('Description').value,
  "ImageSet": "",
  "Reference": ""

}

    let itemsInCart = []
    this.isSubmitted=true;
    console.log('news value',this.signup.value)
    
    let createNews= await this._newsService.createNews(payload)
    if(createNews["success"]==true){
      debugger;
alert("Cretaed Successfully")

    }
    else{
      alert(createNews["error"])

    }
    itemsInCart.push(this.signup.value);
    localStorage.setItem("news_details", JSON.stringify(itemsInCart));
//  this.dataSource.push(this.signup.value);
 this.ngOnInit();
}
onFileChange(event) {
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
  console.log('new data',this.dataSource)
}
 async deleteNews(id){
   debugger;
let deleteNews=await this._newsService.deleteNews(id)
if(deleteNews["success"]==true){
alert("Deleted successfully")
this.loadNews();
}
else{
alert(deleteNews["error"])

}


 }
 async editNews(id){

this.showEdit=true
this.hideCOntent=false
this.newsbyId(id)
 }
 async editsub(){

  let payLoad={
  
    "Title": this.text,
    "Description": this.desc,
    "ImageSet": "",
    "Reference": ""
  
  
  }
  let updateNews=await this._newsService.updateProjectMilestone(payLoad,this.id);
  debugger;
  if(updateNews["success"]==true){
  alert("updated successfully")
  this.loadNews();
  window.location.reload();
  
  }
  else{
  
    alert(updateNews["error"])
  }

 }
 getvalue(event){
   debugger;
   this.text=event
 }
 getvalueDesc(event){
  debugger;
this.desc=event

 }
  newsbyId(id){
    debugger;

let data=this.dataSource.filter(x=>x.Id===id)[0]

this.id=data.Id
 }
}
