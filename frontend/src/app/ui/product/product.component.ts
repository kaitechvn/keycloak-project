import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  public product : any;
  constructor(private http : HttpClient){
  }
  ngOnInit() {
    this.http.get("http://localhost:8082/api/product")
    .subscribe({
      next : data => {
        this.product = data ;
      },
      error : err => {
        console.log(err);
      }
    })
  }
  
  }


