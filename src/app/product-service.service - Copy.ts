import { PrintData } from './product-page/data';
import { Product } from './login/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }

  private updateDataTransferSource=new Subject();
  observeData$=this.updateDataTransferSource.asObservable();

  public sendProduct(product:Product){
     return this.updateDataTransferSource.next(product);
  }
  private addDataTransferSource=new Subject();
  observeAddData$=this.addDataTransferSource.asObservable();
  public add2Product(product:Product){
    return this.updateDataTransferSource.next(product);
 }

  private updateAddTransferSource=new Subject();
  observeValue$=this.updateAddTransferSource.asObservable();

  public sendAddedDataToProductPage(addedString:string){
    return this.updateAddTransferSource.next(addedString)
  }
  public sendUpdatedDataToProductPage(msg:PrintData){
    return this.updateAddTransferSource.next(msg)
  }
 

  public getProducts(){
   return this.http.get("http://localhost:8080/getProducts")
  }
  public addProduct(formValue){
    console.log(formValue)
    return this.http.post("http://localhost:8080/addProduct",formValue)
  }
  public addProductImage(uploadImage){
    console.log(uploadImage)
    return this.http.post("http://localhost:8080/addProductImage",uploadImage)
  }
  public getProduct(id){
    return this.http.get("http://localhost:8080/getProduct/"+id)
  }
  public updateProduct(formValue){
    
    return this.http.put("http://localhost:8080/updateProduct",formValue )
  }
  public deleteProduct(id){
    return this.http.delete("http://localhost:8080/deleteProduct/"+id, {responseType: 'text' as 'json'})
  }
}
