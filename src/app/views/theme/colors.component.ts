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
  text: string;
  desc: string;
  isSubmitted: boolean;
  hideCOntent: boolean;
  imageSrc = [];
  editSource: any;
  showEdit: boolean
  editnewsform: any;
  id: any;

  constructor(@Inject(DOCUMENT) private _document: any, private _newsService: NewsserviceService) { }

  dataSource = []
  ngOnInit(): void {
    this.hideCOntent = true

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
    if (this.signup.invalid) {
     this._newsService.showError('Enter All Fields', 'Error')
  }
  else{
    let payload = {
      "Title": this.signup.get('Title').value,
      "Description": this.signup.get('Description').value,
      "ImageSet": "",
      "Reference": ""
    }
    let itemsInCart = []
    this.isSubmitted = true;
    console.log('news value', this.signup.value)

    let createNews = await this._newsService.createNews(payload)
    if (createNews["success"] == true) {
     this._newsService.showSuccess('Success', 'News Created')
      let ref = document.getElementById('cancel');
      ref?.click();
      this.signup.reset();
    }
    else {
      this._newsService.showError(createNews["error"], 'Error')
      // alert(createNews["error"])
    }
    itemsInCart.push(this.signup.value);
    localStorage.setItem("news_details", JSON.stringify(itemsInCart));
    this.ngOnInit();
  }
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
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

  async loadNews() {
   
    var newsList = await this._newsService.getNews();
    this.dataSource = newsList.data
    console.log('new data', this.dataSource)
  }

  async deleteNews(id) {
    
    let deleteNews = await this._newsService.deleteNews(id)
    if (deleteNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Deleted successfully')
      
      this.loadNews();
    }
    else {
      this._newsService.showError(deleteNews["error"], 'Error')

    }
  }

  editNews(id) {
    this.newsbyId(id)
  }

  async editsub() {

    let payLoad = {
      "Title": this.editnewsform.get('Title').value,
      "Description": this.editnewsform.get('Description').value,
      "ImageSet": "",
      "Reference": ""
    }

    let updateNews = await this._newsService.updateProjectMilestone(payLoad, this.id);
    if (updateNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Updated successfully')
      let ref = document.getElementById('cancel1');
      ref?.click();
      this.loadNews();
      this.editnewsform.reset();

    }
    else {
      this._newsService.showError(updateNews["error"], 'Error')
    }

  }

  getvalue(event) {
    debugger;
    this.text = event
  }

  getvalueDesc(event) {
    debugger;
    this.desc = event

  }

  newsbyId(id) {
    let data = this.dataSource.filter(x => x.Id === id)[0]
    this.editnewsform.patchValue({
      Title: data.Title,
      Description: data.Description
    })
    this.id = data.Id
  }
}
