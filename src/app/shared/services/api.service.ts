import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDB } from '../../shared/inmemory-db/users';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppconfigService } from 'app/appconfig.service';



@Injectable()
export class ApiService {

  items: any[];
  baseurl = this.config.SERVER_URL;
  constructor(
    private http: HttpClient,
    private config: AppconfigService
  ) {
    let userDB = new UserDB();
    this.items = userDB.users; 
  } 
  //publisher
  getPublisherDetails(): Observable<any> {
    return this.http.get(`${this.baseurl}userdetails`)
  }
  getPublisherInit(): Observable<any> {
    return this.http.get(`${this.baseurl}publisherinit`)
  }
  getPublisherServe(): Observable<any> {
    return this.http.get(`${this.baseurl}publisherserve`)
  }






  //******* Implement your APIs ********
  addSeries(item): Observable<any> { 
    return this.http.post(`${this.baseurl}series`, item)
  }
  getItems(): Observable<any> { 
    return this.http.get(`${this.baseurl}publisheritems`)
  }
  getStoreItems(): Observable<any> { 
    return this.http.get(`${this.baseurl}store_allitems`)
  }
  getRegions(): Observable<any> { 
    return this.http.get(`${this.baseurl}regions`)
  }
  getOrders(): Observable<any> { 
    return this.http.get(`${this.baseurl}orders`)
  }
  checkToken(): Observable<any> { 
    return this.http.get(`${this.baseurl}checkToken`)
  }
  getUserDetails(): Observable<any> {
    return this.http.get(`${this.baseurl}userdetails`)
  }


  getRetailerDetails(data): Observable<any> {
    return this.http.get(`${this.baseurl}retailerdetails/`+data.id)
  }
  getAgentDetails(data): Observable<any> {
    return this.http.get(`${this.baseurl}agentdetails/`+data.id)
  }

  getPendingPublishers(): Observable<any> {
    return this.http.get(`${this.baseurl}pendingpublishers`)
  }
  getRetailer(): Observable<any> {
    return this.http.get(`${this.baseurl}retailer`)
  }

  respondPendingPublisher(item): Observable<any>{
    return this.http.post(`${this.baseurl}respondpendingpublisher`, item)
  }
  getLearnerStages(): Observable<any>{
    return this.http.get(`${this.baseurl}learnerstages`)
  }
  getStocks(): Observable<any>{
    return this.http.get(`${this.baseurl}agentstock`)
  }

  addClass(item): Observable<any>{
    return this.http.post(`${this.baseurl}storelearnerstage`, item)
  }

  addRetailer(item): Observable<any>{
    return this.http.post(`${this.baseurl}retailer`, item)
  }
  agentAddRetailer(item): Observable<any>{
    return this.http.post(`${this.baseurl}agentstore`, item)
  }
  
  addPaymentMethod(item): Observable<any>{
    return this.http.post(`${this.baseurl}paymentmethod`, item)
  }

  getPaymentMethod(): Observable<any>{
    return this.http.get(`${this.baseurl}paymentmethod`)
  } 
  getPayments(item): Observable<any>{
    return this.http.post(`${this.baseurl}agentpayments`, item)
  }
  addPayments(item): Observable<any>{
    return this.http.post(`${this.baseurl}agentpayment`,item)
  }
  addRetailPayments(item): Observable<any>{
    return this.http.post(`${this.baseurl}retailpayment`,item)
  }

  getSubjects(): Observable<any>{
    return this.http.get(`${this.baseurl}subject`)
  }

  addSubject(item): Observable<any>{
    return this.http.post(`${this.baseurl}subject`, item)
  }

  addItem(item): Observable<any> {
    return this.http.post(`${this.baseurl}item`, item)
  }

  retailOrder(item): Observable<any> {
    return this.http.post(`${this.baseurl}retailorder`, item)
  }

  calculateSale(item): Observable<any> {
    return this.http.post(`${this.baseurl}calculatesale`, item)
  }
  createSale(item): Observable<any> {
    return this.http.post(`${this.baseurl}createsale`, item)
  }
  agentCalculateSale(item): Observable<any> {
    return this.http.post(`${this.baseurl}agentsalecalculator`, item)
  }

  agentCreateSale(item): Observable<any> {
    return this.http.post(`${this.baseurl}agentcreatesale`, item)
  }

  addStock(item): Observable<any> {
    return this.http.post(`${this.baseurl}publisherstock`, item)
  }
  addgroup(item): Observable<any> {
    return this.http.post(`${this.baseurl}storegroup`, item)
  }
  getPublishers(): Observable<any> {
    return this.http.get(`${this.baseurl}publishers`)
  }
  getAgents(): Observable<any> {
    return this.http.get(`${this.baseurl}agents`)
  }
  
  userRequest(item): Observable<any>{
    return this.http.post(`${this.baseurl}userrequest`,item)
  }

  respondRequest(item): Observable<any>{
    return this.http.post(`${this.baseurl}respondrequest`,item)
  }

  getPartners(): Observable<any>{
    return this.http.get(`${this.baseurl}partners`)
  }
  getClassgroups(): Observable<any>{
    return this.http.get(`${this.baseurl}classgroups`)
  }
  getPublisherSeries(): Observable<any>{
    return this.http.get(`${this.baseurl}publisher_series`)
  }

  getApprovedPartners(): Observable<any>{
    return this.http.get(`${this.baseurl}approvedpartners`)
  }

  updateItem(id, item) {
    this.items = this.items.map(i => {
      if(i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    })
    return of(this.items.slice()).pipe(delay(1000));
  }
  removeItem(row) {
    let i = this.items.indexOf(row);
    this.items.splice(i, 1);
    return of(this.items.slice()).pipe(delay(1000));
  }
}