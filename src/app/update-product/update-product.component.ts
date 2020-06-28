import { PrintData } from './../product-page/data';
import { Router } from '@angular/router';
import { Product } from './../login/product';
import { ProductServiceService } from './../product-service.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {

  constructor(private srevice:ProductServiceService, private router:Router) { }
  visibilityMobile:boolean=false
  visibilityLaptop:boolean=false
  productUpdated:any;
  // data transfer from product page to form in update-product page using subject
  productrecived:any;
  product:Product= new Product("","","" ,"","","","","","","","","");
//  get image and send it to backend
getImage:any
productaddedImage:any
  ngOnInit(): void {
   $('#idCol2').hide()
    this.srevice.observeData$.subscribe(data=>{
      console.log(data)
      this.productrecived=data
    console.log(this.productrecived)
    this.product=this.productrecived
    if(this.product.category=="mobile"){
      this.visibilityMobile=true
      this.visibilityLaptop=false
     }
     else if(this.product.category=="laptop"){
       this.visibilityMobile=false
       this.visibilityLaptop=true
     }else{
      console.log("in null category  oninit()")
       this.visibilityMobile=false
       this.visibilityLaptop=false
        }
              })
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
    console.log(image.value)
      }
      public msg:PrintData=new PrintData("product updated successfully!")
      onSubmit(form){
        this.srevice.updateProduct(form.value).subscribe(data=>this.productUpdated=data)
        this.srevice.sendUpdatedDataToProductPage(this.msg)
        this.router.navigate(['products-page'])
      }

      fileChange(event, id){
        console.log(id)
        this.getImage=event.target.files[0];
        const uploadImage = new FormData();
        uploadImage.append('fileData', this.getImage, id );
        this.srevice.addProductImage(uploadImage).subscribe(data=>{this.productaddedImage=data
          console.log(this.productaddedImage)
          })
      }

}
