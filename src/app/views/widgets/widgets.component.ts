import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsserviceService } from '../../../services/newsservice.service';
@Component({
  templateUrl: 'widgets.component.html'
})
export class WidgetsComponent implements OnInit {
  fixture: FormGroup;
  editfixture: FormGroup;
  dataSource = []
  isSubmitted: boolean;
  id: any;
  constructor(private _newsService: NewsserviceService) { }
  ngOnInit(): void {


    this.fixture = new FormGroup({
      MatchName: new FormControl(null, Validators.required),
      MatchType: new FormControl(null, Validators.required),
      MatchFormat: new FormControl(null, Validators.required),
      MatchDate: new FormControl(null, Validators.required),
      MatchStartTime: new FormControl(null, Validators.required),
      MatchEndTime: new FormControl(null, Validators.required),
      MatchTeamA: new FormControl(null, Validators.required),
      MatchTeamB: new FormControl(null, Validators.required),
      MatchVenue :new FormControl(null, Validators.required)
    });
    this.editfixture = new FormGroup({
      MatchName: new FormControl(null, Validators.required),
      MatchType: new FormControl(null, Validators.required),
      MatchFormat: new FormControl(null, Validators.required),
      MatchDate: new FormControl(null, Validators.required),
      MatchStartTime: new FormControl(null, Validators.required),
      MatchEndTime: new FormControl(null, Validators.required),
      MatchTeamA: new FormControl(null, Validators.required),
      MatchTeamB: new FormControl(null, Validators.required),
      MatchVenue :new FormControl(null, Validators.required)
    });
    this.loadFixtures();
  }

  async loadFixtures() {
   
    var newsList = await this._newsService.getFixtures();
    this.dataSource = newsList.data
    console.log('new data', this.dataSource)
  }

  async onSubmit() {
    if(this.fixture.invalid){
      this._newsService.showError('Enter All Fields', 'Error')
    }
    else{
    this.isSubmitted = true;
    let payload = {
      "MatchName": this.fixture.get('MatchName').value,
      "MatchType": this.fixture.get('MatchType').value,
      "MatchFormat": this.fixture.get('MatchFormat').value,
      "MatchDate": this.fixture.get('MatchDate').value,
      "MatchStartTime": this.fixture.get('MatchStartTime').value,
      "MatchEndTime": this.fixture.get('MatchEndTime').value,
      "MatchTeamA": this.fixture.get('MatchTeamA').value,
      "MatchTeamB": this.fixture.get('MatchTeamB').value,
      "MatchVenue": this.fixture.get('MatchVenue').value,
    }
    let itemsInCart = []

    let createNews = await this._newsService.createFixtures(payload)
    if (createNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Cretaed successfully')
      let ref = document.getElementById('cancel');
      ref?.click();
      this.fixture.reset();
    }
    else {
      this._newsService.showError(createNews["error"], 'Error')
    }
    itemsInCart.push(this.fixture.value);
    localStorage.setItem("news_details", JSON.stringify(itemsInCart));
    this.ngOnInit();
  }
  }

  getFixturesById(id) {
    this.FixturesbyId(id)
  }


 async deleteFixtures(id){
   debugger
    let deleteNews = await this._newsService.deleteFixture(id)
    if (deleteNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Deleted successfully')
      this.loadFixtures();
    }
    else {
      this._newsService.showError(deleteNews["error"], 'Error')

    }
  }

  FixturesbyId(id) {
    let data = this.dataSource.filter(x => x.MatchId === id)[0]
    console.log(data)
    this.editfixture.patchValue({
      MatchName: data.MatchName,
      MatchType: data.MatchType,
      MatchFormat: data.MatchFormat,
      MatchDate: data.MatchDate,
      MatchStartTime: data.MatchStartTime,
      MatchEndTime: data.MatchEndTime,
      MatchTeamA: data.MatchTeamA,
      MatchTeamB: data.MatchTeamB,
      MatchVenue: data.MatchVenue
    })
    this.id = data.MatchId
  }

  async UpdateFixture() {

    let payLoad = {
      "MatchName": this.editfixture.get('MatchName').value,
      "MatchType": this.editfixture.get('MatchType').value,
      "MatchFormat": this.editfixture.get('MatchFormat').value,
      "MatchDate": this.editfixture.get('MatchDate').value,
      "MatchStartTime": this.editfixture.get('MatchStartTime').value,
      "MatchEndTime": this.editfixture.get('MatchEndTime').value,
      "MatchTeamA": this.editfixture.get('MatchTeamA').value,
      "MatchTeamB": this.editfixture.get('MatchTeamB').value,
      "MatchVenue": this.editfixture.get('MatchVenue').value,
    }

    let updateNews = await this._newsService.updateFixtureDetails(payLoad, this.id);
    if (updateNews["success"] == true) {
      this._newsService.showSuccess('Success', 'updated successfully')
      let ref = document.getElementById('cancel1');
      ref?.click();
      this.loadFixtures();
      this.editfixture.reset();
    }
    else {
      this._newsService.showError(updateNews["error"], 'Error')
    }

  }
}
