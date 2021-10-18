import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  constructor(private http:HttpClient,private toastr: ToastrService) { }
  showSuccess(message, title){
    this.toastr.success(message, title)
}
showError(message, title){
  this.toastr.error(message, title)
}

  // News
  async getNews() {
    var parameter_url = environment.base_url + "news/";
    var response = await this.http.get<any>(parameter_url).toPromise()
      .catch(this.handleError);
    console.log(response);
    return response;
  }

  async createNews(newspayload:any){
    let addNewseurl=environment.base_url+"news/";
   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    var addNewsResponse = await this.http.post<any>(addNewseurl, newspayload, httpOptions)
      .toPromise().catch(this.handleError);
    if ((addNewsResponse["data"] != undefined) && (addNewsResponse["data"] != null)) {
      addNewsResponse.success = addNewsResponse["success"];
      addNewsResponse.data = addNewsResponse["data"];
      addNewsResponse.statusCode = addNewsResponse["statusCode"];
    }
    addNewsResponse.error = addNewsResponse["error"];
    return addNewsResponse;
  }

  async updateProjectMilestone(editNews,id){
    let updateNewsurl=environment.base_url + "news/";
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    var updateResponse = await this.http.put<any>(updateNewsurl+id, editNews, httpOptions)
      .toPromise().catch(this.handleError);
    if ((updateResponse["data"] != undefined) && (updateResponse["data"] != null)) {
      updateResponse.success = updateResponse["success"];
      updateResponse.data = updateResponse["data"];
      updateResponse.statusCode = updateResponse["statusCode"];
    }
    updateResponse.error = updateResponse["error"];
    return updateResponse;
  }

  async deleteNews(id){
    let deleteNewsurl=environment.base_url+"news/";
      var deleteResponse = await this.http.delete<any>(deleteNewsurl + id)
      .toPromise().catch(this.handleError);
    if ((deleteResponse["success"] = true)) {
      deleteResponse.success = deleteResponse["success"];
      deleteResponse.data = deleteResponse["data"];
      deleteResponse.statusCode = deleteResponse["statusCode"];
    }
    return deleteResponse;
    }

    // Teams
    async getTeams() {
      var parameter_url = environment.base_url + "teams/";
      var response = await this.http.get<any>(parameter_url).toPromise()
        .catch(this.handleError);
      console.log(response);
      return response;
    }

    async createTeams(newspayload:any){
      let addNewseurl=environment.base_url+"teams/";
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      var addNewsResponse = await this.http.post<any>(addNewseurl, newspayload, httpOptions)
        .toPromise().catch(this.handleError);
      if ((addNewsResponse["data"] != undefined) && (addNewsResponse["data"] != null)) {
        addNewsResponse.success = addNewsResponse["success"];
        addNewsResponse.data = addNewsResponse["data"];
        addNewsResponse.statusCode = addNewsResponse["statusCode"];
      }
      addNewsResponse.error = addNewsResponse["error"];
      return addNewsResponse;
    }

    async deleteTeams(id){
      let deleteNewsurl=environment.base_url+"teams/";
        var deleteResponse = await this.http.delete<any>(deleteNewsurl + id)
        .toPromise().catch(this.handleError);
      if ((deleteResponse["success"] = true)) {
        deleteResponse.success = deleteResponse["success"];
        deleteResponse.data = deleteResponse["data"];
        deleteResponse.statusCode = deleteResponse["statusCode"];
      }
      return deleteResponse;
      }

      async deletePlayers(id){
        debugger
        let deleteNewsurl=environment.base_url+"playerlist/";
          var deleteResponse = await this.http.delete<any>(deleteNewsurl + id)
          .toPromise().catch(this.handleError);
        if ((deleteResponse["success"] = true)) {
          deleteResponse.success = deleteResponse["success"];
          deleteResponse.data = deleteResponse["data"];
          deleteResponse.statusCode = deleteResponse["statusCode"];
        }
        return deleteResponse;
        }

      async updateTeamDetails(editNews,id){
        let updateNewsurl=environment.base_url + "teams/";
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        var updateResponse = await this.http.put<any>(updateNewsurl+id, editNews, httpOptions)
          .toPromise().catch(this.handleError);
        if ((updateResponse["data"] != undefined) && (updateResponse["data"] != null)) {
          updateResponse.success = updateResponse["success"];
          updateResponse.data = updateResponse["data"];
          updateResponse.statusCode = updateResponse["statusCode"];
        }
        updateResponse.error = updateResponse["error"];
        return updateResponse;
      }

      //Get All Players
      async getAllPlayers() {
        var parameter_url = environment.base_url + "playerlist/";
        var response = await this.http.get<any>(parameter_url).toPromise()
          .catch(this.handleError);
        console.log(response);
        return response;
      }

      async getParticularPlayers(id) {
        var parameter_url = environment.base_url + "playerlist/" +id;
        var response = await this.http.get<any>(parameter_url).toPromise()
          .catch(this.handleError);
        console.log(response);
        return response;
      }

      async getSinglePlayers(id) {
        var parameter_url = environment.base_url + "playerbyid/" +id;
        var response = await this.http.get<any>(parameter_url).toPromise()
          .catch(this.handleError);
        console.log(response);
        return response;
      }

      async createPlayers(newspayload:any){
        let addNewseurl=environment.base_url+"playerlist/";
       const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        var addNewsResponse = await this.http.post<any>(addNewseurl, newspayload, httpOptions)
          .toPromise().catch(this.handleError);
        if ((addNewsResponse["data"] != undefined) && (addNewsResponse["data"] != null)) {
          addNewsResponse.success = addNewsResponse["success"];
          addNewsResponse.data = addNewsResponse["data"];
          addNewsResponse.statusCode = addNewsResponse["statusCode"];
        }
        addNewsResponse.error = addNewsResponse["error"];
        return addNewsResponse;
      }
      async updatePlayerDetails(payload,id){
        let updateNewsurl=environment.base_url + "playerlist/";
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        var updateResponse = await this.http.put<any>(updateNewsurl+id, payload, httpOptions)
          .toPromise().catch(this.handleError);
        if ((updateResponse["data"] != undefined) && (updateResponse["data"] != null)) {
          updateResponse.success = updateResponse["success"];
          updateResponse.data = updateResponse["data"];
          updateResponse.statusCode = updateResponse["statusCode"];
        }
        updateResponse.error = updateResponse["error"];
        return updateResponse;
      }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
