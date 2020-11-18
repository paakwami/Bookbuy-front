import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class NewitemService implements Resolve<any>{
  

  publisherseries: any[];
  classgroups: any[];
  subjects: any[];
  learnerstages: any[];

  constructor(private router: Router, private crudeService: ApiService, private data: DataService) { 
    
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
    return new Promise((resolve, reject) => {
      Promise.all([ 
      this.getPublisherSeries(),
      this.getClassGroups(),
      this.getSubjects(),
      this.getLearnerstages(),
    ]).then(
        () => { 
            
            resolve();
        },
        reject
    );
}); 
  }
  getLearnerstages(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.learnerstages){
        this.learnerstages = this.data.learnerstages
        resolve(this.learnerstages);
        reject
      }else{ 
        this.crudeService.getLearnerStages()
          .subscribe((response: any) =>{
            this.learnerstages = response.data;
            this.data.learnerstages = response.data
            resolve(this.learnerstages)
          },
          reject);
      }
  });
  } 

  getPublisherSeries(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.publisherseries){
        this.publisherseries = this.data.publisherseries
        resolve(this.publisherseries);
        reject
      }else{ 
        this.crudeService.getPublisherSeries()
          .subscribe((response: any) =>{
            this.publisherseries = response.data;
            this.data.publisherseries = response.data
            resolve(this.publisherseries)
          },
          reject);
      } 
  });
  }
  
  getClassGroups(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if(this.data.classgroup){
        this.classgroups = this.data.classgroup
        resolve(this.classgroups);
        reject
      }else{ 
        this.crudeService.getClassgroups()
          .subscribe((response: any) =>{
            this.classgroups = response.data;
            this.data.classgroup = response.data
            resolve(this.classgroups)
          },
          reject);
      } 
  });
  }

  getSubjects(): Promise<any[]>
  {
    return new Promise((resolve, reject) => {

      if (this.data.subjects){
        this.subjects = this.data.learnerstages
        resolve(this.subjects);
        reject
      }else{
        this.crudeService.getSubjects()
        .subscribe((response: any) =>{
          this.subjects = response.data;
          this.data.subjects = response.data
          resolve(this.subjects)
        },
        reject);
      }
  });
  }  
  
}

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class NewitemService {

//   constructor() { }
// }
