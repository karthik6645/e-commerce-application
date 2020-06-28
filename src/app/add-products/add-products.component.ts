import { FormsModule } from '@angular/forms';
import { ProductServiceService } from './../product-service.service';
import { Product } from './../login/product';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { from } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private router:Router, private srevice:ProductServiceService) { }
visibilityMobile:boolean=false
visibilityLaptop:boolean=false
products:any
// returned values by post and put
productadded:any
product:Product= new Product("","","" ,"","","","","","","","","");
getImage:File
imageAddedProduct:any
  ngOnInit() {
  }

  valueChange(selecttag){
    if(selecttag.value=="mobile"){
     this.visibilityMobile=true
     this.visibilityLaptop=false
    }
    else if(selecttag.value=="laptop"){
      this.visibilityMobile=false
      this.visibilityLaptop=true

    }else{
      this.visibilityMobile=false
      this.visibilityLaptop=false
    }
  }
  backToProducts(image){
this.router.navigate(['products-page'])
console.log(image)
  }
  onSubmit(form){
console.log(form)
const uploadImage = new FormData();
  this.srevice.addProduct(form.value).subscribe(data=>{this.productadded=data
    uploadImage.append('fileData', this.getImage, this.productadded.id );
    this.srevice.addProductImage(uploadImage).subscribe(data=>{this.imageAddedProduct=data
      console.log(this.imageAddedProduct)
      this.srevice.add2Product(this.imageAddedProduct)
      })
  })
this.srevice.sendAddedDataToProductPage("product added successfully!")
this.router.navigate(['products-page'])
  }
  fileChange(event){
    this.getImage=event.target.files[0];
    console.log(event)
    console.log(this.getImage)
   }

}
