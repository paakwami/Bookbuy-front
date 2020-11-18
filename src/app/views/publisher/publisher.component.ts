import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';
import { UserDetails } from 'app/shared/models/userdetails.models';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { StateService } from '../sessions/state.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css'],
  animations: egretAnimations
})
export class PublisherComponent implements OnInit {

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];
  
  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };

  constructor(
    private data: DataService,
    private state: StateService
  ) { }

  public user;
  public userdetails$: Observable<any>;

  ngOnInit(): void {
    this.userdetails$ = this.data.userdetails$
    this.getUser()
  }

  getUser(){
    this.user = this.state.user
    this.data.userdetails$.subscribe(res=>{
      this.data.userdetails = res
    }
      
    )
  }

}
