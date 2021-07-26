import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private params: any;
  private currentProduct: any;

  constructor(
    private producto: ProductoService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.productc) {
      this.getRouteParams();
    }
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });

    this.currentProduct = this.params.product;

  }
}
