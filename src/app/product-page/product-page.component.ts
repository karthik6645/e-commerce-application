import { PrintData } from './data';
import { Product } from './../login/product';

import { ProductServiceService } from './../product-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
  
declare var $:any;

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
title="ProductPageComponent"
  constructor(private router:Router , private service:ProductServiceService) { }
  // recieved data from rest api's
products:any;
 productGot:any;
 deletedMsg:any;
 deletedMsg2:any;
//  data from service(subject) in order to display successfull msg
public dataRecieved:any;
msg:PrintData=new PrintData("")
  ngOnInit(): void{
    console.log("ngOnit() called")
   this.service.observeValue$.subscribe(data=>{ this.dataRecieved= data
    console.log(data)
    this.msg=this.dataRecieved
    console.log(this.dataRecieved)
  })
  // this.service.observeAddData$.subscribe(data=>{this.products.push(data)
  // console.log(this.products)
  // })
    this.service.getProducts().subscribe(data=>{this.products=data
    console.log("in get products")
    }); 
  }
user="karthik"
myImage:string="assets/images/sony-xperia-l4-2.jpg"
addproduct(){
  this.router.navigate(['add'])
}

updateProduct(product){
  this.service.getProduct(product.id).subscribe(data=>{
    this.productGot=data
    this.service.sendProduct(this.productGot)})
  this.router.navigate(['update'])
}

deleteProduct(product){
this.products.splice(product.id,1)
this.service.deleteProduct(product.id).subscribe(data=>{this.deletedMsg=data
console.log(this.deletedMsg);
this.deletedMsg2="Product "+product.id+" deleted successfully!"
})
$("#printDeletedMsg").show()
// this.reloadData()
let id="#"+product.id
console.log(id)
$(id).slideUp(2000)
setTimeout(function(){$("#printDeletedMsg").hide()}, 10000)
}
signOut(){
  this.router.navigate(['login'])
}
}
