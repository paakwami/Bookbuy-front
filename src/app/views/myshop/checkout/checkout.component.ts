import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryDB, RegionsDB } from '../../../shared/inmemory-db/countries';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { ShopdataService, CartItem } from '../shopdata.service';
import { StateService } from 'app/views/sessions/state.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/views/sessions/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ApiService } from 'app/shared/services/api.service';
import { DataService } from 'app/shared/data/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: egretAnimations
})
export class CheckoutComponent implements OnInit {
  public cart: CartItem[];
  public checkoutForm: FormGroup;
  public checkoutFormAlt: FormGroup;
  public hasAltAddress: boolean;
  public countries: any[];
  public regions: any[];
  public districts: any[];

  public total: number;
  public subTotal: number;
  public vat: number = 15;
  public shipping: any = 'Free';
  public paymentMethod: string;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopdataService,
    private state: StateService,
    private router: Router,
    private toastr: ToastrService,
    private us: UserService,
    private data: DataService,
    private loader: AppLoaderService,
    private api: ApiService,
  ) {
    let countryDB = new RegionsDB();
    this.countries = countryDB.Regions;
  }

  ngOnInit() {
    this.check()
    this.getCart();
    this.buildCheckoutForm();
    this.regions = this.data.regions
    this.districts = []

  }
  check(){
    if( this.us.order){
      this.placebackend(this.us.order)
    }

  }

  change(event){
    this.districts = event.value.district[0]
    console.log(this.districts)
  }
  calculateCost() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.sale * item.data.quantity)
    })
    this.total = this.subTotal //+ (this.subTotal * (15/100));
    if(this.shipping !== 'Free') {
      this.total += this.shipping;
    }
  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
      this.calculateCost();
    })
  }
  buildCheckoutForm() {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      district: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      gps: ['', Validators.required],
      phone: ['', Validators.required],
      total: this.total
    })

  }


  placeOrder() {
    if(this.checkoutForm.valid){
    let user
    if(this.state.status){
      this.state.user.subscribe(a=>(user = a))
      let billingAddress = [{
        'form': this.checkoutForm.value,
        'cart': this.cart,
     }]

     this.placebackend(billingAddress)
    }else{
      let billingAddress = [{
        'form': this.checkoutForm.value,
        'cart': this.cart,
     }]
     this.us.order = billingAddress
     this.toastr.warning('pending...', 'Login to complete your order')
     this.router.navigate(['sessions/signin4'])
    }
    }
  }

  placebackend(order){

    this.loader.open
    this.api.retailOrder(order).subscribe(response=>{
      console.log(response)
      this.loader.close

    })
    
  }

}


// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css']
// })
// export class CheckoutComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
