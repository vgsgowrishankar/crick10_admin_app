import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsserviceService {

  constructor(private http:HttpClient) { }
  async getNews() {
    debugger;
    var parameter_url = environment.base_url + "news/";
    debugger;
    var response = await this.http.get<any>(parameter_url).toPromise()
      .catch(this.handleError);
    console.log(response);
    return response;;
  }
  async createNews(newspayload:any){
 
    debugger
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
    ;
   
  }
   
  async updateProjectMilestone(editNews){
  
  
   
    let updateNewsurl=environment.base_url + "projectmilestone/";
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    var updateResponse = await this.http.put<any>(updateNewsurl+ editNews["id"]+"/", editNews, httpOptions)
      .toPromise().catch(this.handleError);
    debugger;
    if ((updateResponse["data"] != undefined) && (updateResponse["data"] != null)) {
      updateResponse.success = updateResponse["success"];
      updateResponse.data = updateResponse["data"];
      updateResponse.statusCode = updateResponse["statusCode"];
    }
   
    updateResponse.error = updateResponse["error"];
    return updateResponse;
   
   
  }
  async deleteMilestone(id){
   
    let deleteProjecturl=environment.base_url+"news/";
      var deleteResponse = await this.http.delete<any>(deleteProjecturl + id+"/")
      .toPromise().catch(this.handleError);
    
    
    if ((deleteResponse["success"] = true)) {
      deleteResponse.success = deleteResponse["success"];
      deleteResponse.data = deleteResponse["data"];
      deleteResponse.statusCode = deleteResponse["statusCode"];
    }
    
    return deleteResponse;
    
    
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
