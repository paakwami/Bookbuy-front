import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppconfigService {

  SERVER_URL = "http://127.0.0.1:8000/api/"; 
  //http://127.0.0.1:8000/api/ http://api.bookbuy.shop/api/

  constructor() { }
}
