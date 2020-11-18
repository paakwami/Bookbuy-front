import { Component, OnInit, Input } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;
  public carouselOptions: NguCarouselConfig;
  public testimonials = [{
    logo: 'assets/images/mock-logo-4.png',
    photo: 'assets/images/face-1.jpg',
    text: `“We have a lot of locked up funds, Even before the Corona, we knew there was a problem with our distribution
    and sales management but we couldn't think of how to solve this issue. We have recorded huge bad debts over the years
    many of which is needless. ”`,
    title: 'Mr. Jedidiah Mereko',
    subtitle: 'CEO'
  }, {
    logo: 'assets/images/mock-logo-2.png',
    photo: 'assets/images/face-2.jpg',
    text: `"It has been difficult trusting our sales agents on this business. What they tell us could be true or false we 
    only have to take their word for it. We don't have any transparency in this business except people's word. This makes it 
    difficult to make business decisions"`,
    title: 'Mr. Nathan Sikapa',
    subtitle: 'CEO'
  }, {
    logo: 'assets/images/mock-logo-3.png',
    photo: 'assets/images/face-3.jpg',
    text: `"Agents are always are in a tight corner to give funds to publishing houses even if we havn't received from our 
    retailers. A transparent system of this magnitude will help us to work as a team. Now our publishers will know we have 
    that we are doing our best."`,
    title: 'Mr. Simpa Gregory',
    subtitle: 'Sales Agent'
  }]
  constructor() { }

  ngOnInit() {
    this.carouselOptions = {
      grid: { xs: 1, sm: 1, md: 1, lg: 3, all: 0 },
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

}
