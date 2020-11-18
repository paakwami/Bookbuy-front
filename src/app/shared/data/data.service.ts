import { Injectable } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StateService } from 'app/views/sessions/state.service';
import { ApiService } from '../services/api.service';
import { ObserversModule } from '@angular/cdk/observers';
import { subscribeOn, observeOn } from 'rxjs/operators';
import { UserDetails } from '../models/userdetails.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public learnerstages: any[];
  public subjects: any[];
  public items: any[];
  public publishers: any[];
  public agents: any[];
  public partners: any[];
  public approvedpartners: any[];
  public pendingPublishers: any[];
  public paymentmethods: any[];
  public retailers: any[];
  public stocks: any[];
  public role;
  public selectedretailer;
  public newsaledata;
  
  public classgroup: any[];
  public publisherseries: any[];
  public selectedproduct: any[];
  public regions: any[];
  public orders: any[];

  public userdetails$: Observable<UserDetails>;
  public publiserinitialization$: Observable<any>;
  public pubinit;
  public selectedagent;
  public userdetails; 
  public publisherServe;
  

  public getlearnerstageSub: Subscription;
  public getsubjectSub: Subscription;
  public getItemSub: Subscription;
  public getpublishersSub: Subscription;
  public getagentsSub: Subscription;
  public getpartnersSub: Subscription;
  public getpaymentmethodsSub: Subscription;
  public getClassgroupsub: Subscription;
  public getPublisherseriessub: Subscription;

  constructor(
    private state: StateService,
    private crudService: ApiService,
  ) {
    this.role = this.state.role;
   }
   getPublisherSeries(){
    this.getpublishersSub = this.crudService.getPublisherSeries()
    .subscribe(data => {
       this.publishers = data.data
      });
  }

   getClassgroups(){
    this.getClassgroupsub = this.crudService.getClassgroups()
    .subscribe(data => {
       this.classgroup = data.data
      });
  } 

  getPartners(){
    this.getpartnersSub = this.crudService.getPartners()
    .subscribe(data => {
       this.partners = data.data
      });
  }
  getPaymentmethods(){
    this.getpaymentmethodsSub = this.crudService.getPaymentMethod()
    .subscribe(data => {
       this.paymentmethods = data.data
      });
  }

  getSubject(){
    this.getsubjectSub = this.crudService.getSubjects()
    .subscribe(data => {
      this.subjects = data.data;
    })
  }

  getLearnerstage(){
    this.getlearnerstageSub = this.crudService.getLearnerStages()
    .subscribe(data =>{
      this.learnerstages = data.data;
    })

  } 
  getItems() {
    this.getItemSub = this.crudService.getItems()
      .subscribe(data => {
        this.items = data.data;
      })
  }
  getPublishers(){
    this.getpublishersSub = this.crudService.getPublishers()
      .subscribe(data=>{
        this.publishers = data
      })
    
  }
  getAgents(){
    this.getagentsSub = this.crudService.getAgents()
      .subscribe(data=>{
        this.agents = data
      })
    
  }

}
