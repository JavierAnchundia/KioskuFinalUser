import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import AUTH_SERVICIOS from 'src/app/config/urls';
import { AnuncioService } from 'src/app/services/anuncio/anuncio.service';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public anuncioList: any[] = [];
  public recent: any[] = [];
  public mediaPath = AUTH_SERVICIOS.mediaURL;


  constructor(
    private anuncio: AnuncioService,
    private producto: ProductoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAnuncios();
    this.loadMostRecent();
  }

  loadAnuncios(): void {
    this.anuncio.retrieveAdvertisements()
    .then((data: any) => {
      this.anuncioList = data.reverse();
    })
    .catch((err: any) =>console.log(err))
  }

  loadMostRecent(): void{
    this.producto.retrieveRecentProductByCat()
    .then((data: any) => {
      this.recent = data;
    })
    .catch((err: any) =>console.log(err))
  }

  goToCategory(id: string): void{
    const navigationExtras: NavigationExtras = {
      queryParams: {
        cat: id,
      }
    };
    this.router.navigate(['/inicio/productos/lista'], navigationExtras);
  }

  openProductDetail(id: string): void{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        producto: id,
      }
    };
    this.router.navigate(['/inicio/productos/detalle'], navigationExtras);
  }
}
