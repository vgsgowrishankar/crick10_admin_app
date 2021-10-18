import { Component, OnInit } from '@angular/core';
import { NewsserviceService } from '../../../services/newsservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'alerts.component.html',
  styles: [
    `
  .alert-md-local {
    background-color: #009688;
    border-color: #00695C;
    color: #fff;
  }
  `
  ],

})
export class AlertsComponent implements OnInit {
  teams: FormGroup;
  editTeamsform: FormGroup;
 
  isSubmitted: boolean;
  hideCOntent: boolean;
  dataSource = [];
  id: any;
  constructor(private _newsService: NewsserviceService,private router: Router) { }

  ngOnInit(): void {
    this.hideCOntent = true
    this.teams = new FormGroup({
      TeamName: new FormControl(null, Validators.required),
      TeamHomeGround: new FormControl(null, Validators.required),
      Title: new FormControl(null, Validators.required),
      Owner: new FormControl(null, Validators.required),
      Coach: new FormControl(null, Validators.required),
      Captain: new FormControl(null, Validators.required),
    });
    this.editTeamsform = new FormGroup({
      TeamName: new FormControl(null, Validators.required),
      TeamHomeGround: new FormControl(null, Validators.required),
      Title: new FormControl(null, Validators.required),
      Owner: new FormControl(null, Validators.required),
      Coach: new FormControl(null, Validators.required),
      Captain: new FormControl(null, Validators.required),
    });
    this.GetTeamsList();
  }

  get f() { return this.teams.controls; }
  get f1() { return this.editTeamsform.controls; }

  GetTeamsList() {
    this.getTeams();
  }

  getTeamsById(id) {
    this.TeamsbyId(id)
  }

  async onSubmit() {
    if(this.teams.invalid){
      this._newsService.showError('Enter All Fields', 'Error')
    }
    else{
    this.isSubmitted = true;
    let payload = {
      "TeamName": this.teams.get('TeamName').value,
      "TeamHomeGround": this.teams.get('TeamHomeGround').value,
      "Title": this.teams.get('Title').value,
      "Owner": this.teams.get('Owner').value,
      "Coach": this.teams.get('Coach').value,
      "Captain": this.teams.get('Captain').value,
    }
    let itemsInCart = []

    let createNews = await this._newsService.createTeams(payload)
    if (createNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Cretaed successfully')
      let ref = document.getElementById('cancel');
      ref?.click();
      this.teams.reset();
    }
    else {
      this._newsService.showError(createNews["error"], 'Error')
    }
    itemsInCart.push(this.teams.value);
    localStorage.setItem("news_details", JSON.stringify(itemsInCart));
    this.ngOnInit();
  }
  }

  async deleteTeams(id) {
    let deleteNews = await this._newsService.deleteTeams(id)
    if (deleteNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Deleted successfully')
      this.GetTeamsList();
    }
    else {
      this._newsService.showError(deleteNews["error"], 'Error')

    }
  }

  public async getTeams() {
    var newsList = await this._newsService.getTeams();
    this.dataSource = newsList.data
  }

  TeamsbyId(id) {
    let data = this.dataSource.filter(x => x.TeamId === id)[0]
    console.log(data)
    this.editTeamsform.patchValue({
      TeamName: data.TeamName,
      TeamHomeGround: data.TeamHomeGround,
      Title: data.Title,
      Owner: data.Owner,
      Coach: data.Coach,
      Captain: data.Captain
    })
    this.id = data.TeamId
  }

  async UpdateTeam() {

    let payLoad = {
      "TeamName": this.editTeamsform.get('TeamName').value,
      "TeamHomeGround": this.editTeamsform.get('TeamHomeGround').value,
      "Title": this.editTeamsform.get('Title').value,
      "Owner": this.editTeamsform.get('Owner').value,
      "Coach": this.editTeamsform.get('Coach').value,
      "Captain": this.editTeamsform.get('Captain').value,
    }

    let updateNews = await this._newsService.updateTeamDetails(payLoad, this.id);
    if (updateNews["success"] == true) {
      this._newsService.showSuccess('Success', 'updated successfully')
      let ref = document.getElementById('cancel1');
      ref?.click();
      this.GetTeamsList();
      this.editTeamsform.reset();
    }
    else {
      this._newsService.showError(updateNews["error"], 'Error')
    }

  }

  viewPlayers(id){
    this.router.navigate(['/teams/allPlayers/'+id])
  }

  Createplayer(id,name){
    this.router.navigate(['/teams/Createplayers/'+id+'/'+name])
  }
  

}
