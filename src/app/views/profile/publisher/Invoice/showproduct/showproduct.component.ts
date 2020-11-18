import { Component, OnInit } from '@angular/core';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css'],
  animations: egretAnimations
})
export class ShowproductComponent implements OnInit {

  selectedProduct: any;
  constructor(
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.getSelectedProduct();
    this.selectedProduct.picture = this.selectedProduct.picture.replace('\/','/');
  }

  getSelectedProduct(){
    this.selectedProduct = this.data.selectedproduct;
  }
}
