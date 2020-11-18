import { AfterViewInit, Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetShareComponent } from '../../shared/components/bottom-sheet-share/bottom-sheet-share.component';


@Component({
  selector: 'app-portfolio-carousel',
  templateUrl: './portfolio-carousel.component.html',
  styleUrls: ['./portfolio-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioCarouselComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  
  public carouselOptions: NguCarouselConfig;
  public portfolios = [{
    photo: 'assets/images/sq-10.jpg',
    text: `Publishing houses as well as Agents can keep track of their inventory
    using our inventory tracker, We prompt you with timely statistics which are necessary
    in making critical business decisions.`,
    title: 'Management of Inventory',
  }, {
    photo: 'assets/images/sq-11.jpg',
    text: `Invoicing, receiving payment as well as receiving returns has never been this easy. Customers are 
    notified via SMS of any transaction performed also including a summary report of customer ledger.`,
    title: 'Sales Management',
  }, {
    photo: 'assets/images/sq-12.jpg',
    text: `Publishing houses receives as to happenings on the grounds as their Agents do business. This real time
    data with regards to sales and payment is crucial in making smart business decisions in the field.`,
    title: 'Real Time Information',
  }, {
    photo: 'assets/images/sq-13.jpg',
    text: `Debt Tracking has never been easy, the system makes the publishing house a transparent business such that 
    you can view debts on the grounds. Publishers can help their agents on the grounds to recollect locked up funds.`,
    title: 'Debt Tracker',
  }, {
    photo: 'assets/images/sq-15.jpg',
    text: `To print for an academic year, Publishers mostly resort to guess work. The transparency of the system affords
    users the opportunity to forecast with an accuracy of 95% their next print order which will maximize profit`,
    title: 'Business Forecast',
  }]
  
  constructor(private bottomSheet: MatBottomSheet, private _cdr: ChangeDetectorRef) { 
  }

  openShareComponent(): void {
    this.bottomSheet.open(BottomSheetShareComponent);
  }

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      interval: {timing: 4000},
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true
    }
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

}
