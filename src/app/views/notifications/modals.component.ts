import {Component, ViewChild, OnInit} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewsserviceService } from '../../../services/newsservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  templateUrl: 'modals.component.html'
})
export class ModalsComponent implements OnInit {
  playerform : FormGroup
  isSubmitted: boolean;
  teamid : any
  teamName : any
  isCreate:boolean;
  isEdit:boolean;
  Updateid :  any
  dataSource = [];
  public playerName: any;
  public battingStyle: any;
  public bowlingStyle: any;
  public role: any;
  public nationalty: any;
  public dob: any;
  public debutYear: any;
  public href:any;
  Editplayerform: FormGroup;
  newsList: any;
  constructor(private _newsService: NewsserviceService,private route: ActivatedRoute,private router:Router, public datepipe: DatePipe, private Router: Router) { 
    this.teamid = this.route.snapshot.params['id'];
    this.teamName = this.route.snapshot.params['name'];
    this.Updateid = this.route.snapshot.params['Updateid'];
    
  }
  ngOnInit(): void{
    this.href= this.route.snapshot.data.data;
    debugger;
    if(this.href=='create'){
this.isEdit=false
this.isCreate=true

    }
    else{

this.isCreate=false
this.isEdit=true

    }
    this.playerform = new FormGroup({
      playerName: new FormControl(null, Validators.required),
      battingStyle: new FormControl(null, Validators.required),
      bowlingStyle: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      nationalty: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      debutYear: new FormControl(null, Validators.required),
    });

    this.Editplayerform = new FormGroup({
      playerName: new FormControl(null, Validators.required),
      battingStyle: new FormControl(null, Validators.required),
      bowlingStyle: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      nationalty: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      debutYear: new FormControl(null, Validators.required),
    });
    this.GetSinglePlayer();
  }

  async GetSinglePlayer(){
     this.newsList = await this._newsService.getSinglePlayers(this.Updateid);
 
  
    this.dataSource = this.newsList.data[0]
    this.dataSource["Dob"]=this.newsList.data[0]["Dob"].split('T')[0]
    
    debugger
    let editdata = this.dataSource
    console.log(editdata)
    // this.playerform.patchValue({
    //   playerName: editdata.playerName,
    //   battingStyle: editdata.battingStyle,
    //   bowlingStyle: editdata.bowlingStyle,
    //   role: editdata.role,
    //   nationalty: editdata.nationalty,
    //   dob: editdata.dob,
    //   debutYear: editdata.debutYear
    // })
debugger
  }
  back(){
    this.Router.navigate(['teams/details'])
  }
  async playerSubmitform() {
    if(this.playerform.invalid){
      this._newsService.showError('Enter All Fields', 'Error')
    }
    else{
    this.isSubmitted = true;
    let dt=new Date(this.playerform.get('dob').value)
    
    let payload = {
      "teamId" : this.teamid,
      "playerName": this.playerform.get('playerName').value,
      "battingStyle": this.playerform.get('battingStyle').value,
      "bowlingStyle": this.playerform.get('bowlingStyle').value,
      "role": this.playerform.get('role').value,
      "nationalty": this.playerform.get('nationalty').value,
      "dob": this.datepipe.transform(dt,"yyyy-MM-dd"),
      "debutYear": this.playerform.get('debutYear').value,
    }
    let itemsInCart = []

    let createNews = await this._newsService.createPlayers(payload)
    if (createNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Created successfully')
      this.Router.navigate(['teams/details'])
    }
    else {
      this._newsService.showError(createNews["error"], 'Error')

    }
    itemsInCart.push(this.playerform.value);
    localStorage.setItem("news_details", JSON.stringify(itemsInCart));
    this.ngOnInit();
  }
}
async editPlayerSubmit(){

  if(this.Editplayerform.invalid){
    this._newsService.showError('Enter All Fields', 'Error')
  }
  else{
  this.isSubmitted = true;
  let dt=new Date(this.Editplayerform.get('dob').value)
  
  let payload = {
    "TeamId" : this.dataSource["TeamId"],
    "PlayerName": this.Editplayerform.get('playerName').value,
    "BattingStyle": this.Editplayerform.get('battingStyle').value,
    "BowlingStyle": this.Editplayerform.get('bowlingStyle').value,
    "Role": this.Editplayerform.get('role').value,
    "Nationalty": this.Editplayerform.get('nationalty').value,
    "Dob": this.datepipe.transform(dt,"yyyy-MM-dd"),
    "DebutYear": this.Editplayerform.get('debutYear').value,
  }
 

  let updatePlayerDetails = await this._newsService.updatePlayerDetails(payload,this.dataSource["PlayerId"])
  if (updatePlayerDetails["success"] == true) {
    this._newsService.showSuccess('Success', 'Created successfully')
    this.Router.navigate(['teams/details'])
  }
  else {
    this._newsService.showError(updatePlayerDetails["error"], 'Error')

  }
 
}




}
}
