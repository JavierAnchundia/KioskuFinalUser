import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';
import { ImagenProductoService } from 'src/app/services/imagen-producto/imagen-producto.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private params: any;
  public currentProduct: any;
  public imagesList: any[] = [];
  public currentDisplayPic: string = '';

  constructor(
    private producto: ProductoService,
    private imgProducto: ImagenProductoService,
    public route: ActivatedRoute,
    public router: Router,
    private carro: CarroComprasService,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams.producto) {
      this.getRouteParams();
    }
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
    this.loadProductInfo();
    this.loadProductImages();
  }

  loadProductInfo(): void {
    this.producto.retrieveProductById(this.params.producto)
      .then(product => this.currentProduct = product)
      .catch(error => console.log(error))
  }

  loadProductImages(): void {
    this.imgProducto.retrieveImagesByProduct(this.params.producto)
      .then(img => {
        this.imagesList = img;
        this.currentDisplayPic = 'http://127.0.0.1:8000/static' + img[0]['imagen'];
        console.log(img)
      })
      .catch(error => console.log(error))
  }

  changeCurrentDisplayPic(path: string): void {
    this.currentDisplayPic = 'http://127.0.0.1:8000/static' + path;
  }

  addToCart(product: Producto) {
    console.log(product);
    product.thumbnail = this.currentDisplayPic;
    this.carro.addToCart(product);
  }
}
