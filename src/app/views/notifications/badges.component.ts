import { Component, OnInit } from '@angular/core';
import { NewsserviceService } from '../../../services/newsservice.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  templateUrl: 'badges.component.html'
})
export class BadgesComponent implements OnInit {
  dataSource = [];
  teamid : any
  constructor(private _newsService: NewsserviceService,private route: ActivatedRoute, private Router: Router) {
    this.teamid = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.GetParticularPlayer();
  }

  async GetParticularPlayer(){
    var newsList = await this._newsService.getParticularPlayers(this.teamid);
    this.dataSource = newsList.data
  }

  async getPlayersById(id){
    this.Router.navigate(['/teams/Updateplayers/'+id])
  }
  back(){
    this.Router.navigate(['teams/details'])
  }
  async deletePlayers(id) {
    debugger
    let deleteNews = await this._newsService.deletePlayers(id)
    if (deleteNews["success"] == true) {
      this._newsService.showSuccess('Success', 'Deleted successfully')
      window.location.reload();
      this.ngOnInit();
    }
    else {
      this._newsService.showError(deleteNews["error"], 'Error')

    }
  }
}
