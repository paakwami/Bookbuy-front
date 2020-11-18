import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppconfigService } from 'app/appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private SERVER_URL = this.config.SERVER_URL;
  
  constructor(private httpClient: HttpClient, private config: AppconfigService) { }

  public registerPublisher(form): Observable<object> {  
		return this.httpClient.post(`${this.SERVER_URL}storeuser`, form);  
  }  
  public registerAgent(form): Observable<object> {  
		return this.httpClient.post(`${this.SERVER_URL}storeagent`, form);  
  }  
  public registerRetail(form): Observable<object> {  
		return this.httpClient.post(`${this.SERVER_URL}storeretail`, form);  
  }  
  public signin(form): Observable<object> {  
		return this.httpClient.patch(`${this.SERVER_URL}login`, form);  
  }  
  
}
