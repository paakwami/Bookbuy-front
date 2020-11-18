import { Component, OnInit } from '@angular/core';
import { AgentSummaryService } from '../agent-summary/agent-summary.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ApiService } from 'app/shared/services/api.service';
import { Subscription } from 'rxjs';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/data/data.service';
import { RetailSummaryService } from '../retail-summary/retail-summary.service';

@Component({
  selector: 'app-agent-new-sale',
  templateUrl: './agent-new-sale.component.html',
  styleUrls: ['./agent-new-sale.component.css']
})
export class AgentNewSaleComponent implements OnInit {

  selectedretailer 
  constructor(private agent: RetailSummaryService,
              private crudService: ApiService, 
              private fb: FormBuilder,
              private loader: AppLoaderService,
              private toastr: ToastrService,
              private data: DataService,
              private router: Router) { }

  dynamicForm: FormGroup;
  role;
  submitted = false;
  pitems
  length;
  totalsale;
  afterdiscount;
  selected: any[];
  items;
  

  public getItemSub: Subscription;

  ngOnInit(): void {
    this.selectedretailer = this.agent.selectedretailer
    this.role = this.data.role;
    this.dynamicForm = this.fb.group({
      numberOfTickets: ['', Validators.required],
      retailer:this.selectedretailer,
      discount: ['', Validators.required],
      tickets: new FormArray([])
  });
  this.pitems = this.items = this.data.stocks
  this.length = Array(this.items.length).fill(1).map((x,i)=>i+1);
  }

  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }


  onChangeTickets(e) {
    const numberOfTickets = e.value || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.fb.group({
                item: ['', Validators.required],
                quantity: ['', [Validators.required]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
    
}
highlight(e){
  console.log(e)
}
itemchange(e){
  e.value.status = 0
  this.pitems = this.pitems.filter(function(element) {return element.id !== e.value.id;});
  this.pitems = this.pitems.concat([e.value]);
}

removeitem(e){
  this.t.removeAt(e)
}
onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.dynamicForm.invalid) {
      return;
  }

  const sold = this.dynamicForm.value.tickets
  const discount = this.dynamicForm.value.discount
  this.totalsale = 0
  for (var i = 0, length = sold.length; i < length; i++) {
      this.totalsale = this.totalsale + (sold[i].item.price * sold[i].quantity)
    }
  
    this.afterdiscount = this.totalsale * (1-(discount/100))

  for (var i = 1, length = this.dynamicForm.value.tickets.length; i < length; i++) {

    //this.dynamicForm.value.tickets.find(x => x.id === '45').foo;
}

  // display form values on success
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
}

onReset() {
  // reset whole form back to initial state
  this.submitted = false;
  this.dynamicForm.reset();
  this.t.clear();
}

onClear() {
  // clear errors and reset ticket fields
  this.submitted = false;
  this.t.reset();
}

calculateSale(){
  this.loader.open();
  this.crudService.agentCalculateSale(this.dynamicForm.value)
  .subscribe(response=>{
    this.loader.close(),
    this.data.newsaledata = this.dynamicForm.value
    this.router.navigate(['/invoice/preinvoice'])
    this.toastr.success('succes', response)
    }, 
    error=>{this.loader.close(), this.toastr.error('error', error.error)})
  
}  

}



// import { Component, OnInit } from '@angular/core';

// @Component({

// })
// export class AgentNewSaleComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
