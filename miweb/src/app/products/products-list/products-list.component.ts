import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import AUTH_SERVICIOS from 'src/app/config/urls';
import { Demo } from 'src/app/demo';
import { CarroComprasService } from 'src/app/services/carro-compras/carro-compras.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public categoriesList: any[] = [];
  public subCatList: any[] = [];
  public productsList: any[] = [];
  public inputValue?: string;
  public filteredOptions: any[] = [];
  public loading = true;
  public params: any;
  public currentCat: any = {nombre: 'Más recientes', id:''};
  public currentSubCat: any = '';
  public currentSubCatName: any = null;
  public selectedTags: string[] = [];
  public nameValue?: string;
  public filteredName: string[] = [];
  private options : string[] = [];
  public filteredProducts: any[] = [];
  public mediaPath = AUTH_SERVICIOS.mediaURL;


  constructor(
    private categorias: CategoriaService,
    private subcategoria: SubcategoriaService,
    private producto: ProductoService,
    private carro: CarroComprasService,
    public route: ActivatedRoute,
    public router: Router,
    private usuario: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void{
    this.categoriesList = Demo.getCategorias();
    this.filteredOptions = this.categoriesList;
      if (this.route.snapshot.queryParams.cat) { // * En caso de que el url tenga parametros
        this.getRouteParams();
      } else {
        this.loadMostRecent();
      }
      /*
    this.categorias.retrieveCategories()
    .then(categ => {
      this.categoriesList = categ;
      this.filteredOptions = this.categoriesList;
      if (this.route.snapshot.queryParams.cat) { // * En caso de que el url tenga parametros
        this.getRouteParams();
      } else {
        this.loadMostRecent();
      }
    })
    .catch((error: any) => console.log(error))
*/
  }

  loadSubcategories(id: string): void{
    this.subCatList = Demo.getSubCategorias().filter(element => element.categoria == id);
   /*  this.subcategoria.retrieveSubcategoriesByCat(id)
    .then(subcat => this.subCatList = subcat)
    .catch((error: any) => console.log(error)) */
  }

  loadMostRecent(): void{
    this.loading = true;
    this.options = [];
    this.productsList = Demo.getProductos();
    Demo.getProductos().forEach((element: any) => {
      this.options.push(
        element.titulo
      )
    })
    this.filteredProducts = this.productsList;
    this.filteredName = this.options;

    this.loading = false;

   /*  this.producto.retrieveMostRecent()
    .then(prod => {
      prod[0].forEach((element: any) => {
        this.productsList.push({
          id: element.id,
          titulo: element.titulo,
          descripcion: element?.descripcion,
          precio: element?.precio,
          disponible: element?.disponible,
          creditos: element?.item.creditos,
          cantidad: element?.item.cantidad,
          thumbnail: this.mediaPath + element?.thumbnail,
        });

        this.options.push(
          element.titulo
        )
      })
      this.filteredProducts = this.productsList;
      this.filteredName = this.options;

      this.loading = false;
    })
    .catch((error: any) => {
      console.log(error);
      this.loading = false;
    }) */
  }

  onChangeCategory(value: any): void {
    this.filteredOptions = this.categoriesList.filter((option: any) =>
    option.nombre.toLowerCase().includes(value.toString().toLowerCase()) !== false);
    if (value[0] !== undefined && value[0] != ""){
      this.currentCat = value[0];
      //this.productsList= [];
      this.loading = true;
      this.router.navigate(['.'], {
        relativeTo: this.route, queryParams: {
          cat: this.currentCat.id,
        }, replaceUrl: true
      });
      this.loadSubcategories(this.currentCat.id);
      this.loadProductsByCategory(this.currentCat.id);
    } else {
      this.subCatList = [];
      this.currentCat = {nombre: 'Más recientes', id:''};
      this.router.navigate(['.'], {
        relativeTo: this.route, queryParams: {
          cat: this.currentCat.id,
        }, replaceUrl: true
      });
      this.loadMostRecent();
    }
  }

  loadProductsByCategory(id: string): void{
    this.productsList = Demo.getProductos();
    this.productsList = this.productsList.filter((option: any) => option.categoria == id);
    this.filteredProducts = this.productsList;
    this.filteredName = this.options;

    this.loading = false;

  }

  loadProductsBySubCategory(id: string): void{
    this.productsList = Demo.getProductos();
    this.productsList = this.productsList.filter((option: any) => option.subcategoria == id);
    this.filteredProducts = this.productsList;
    this.filteredName = this.options;

    this.loading = false;
   /*  this.producto.retrieveProductsBySubcat(id)
    .then(prod => {
      //console.log(prod);
      prod[0].forEach((element: any) => {
        this.productsList.push({
          id: element.id,
          titulo: element.titulo,
          descripcion: element?.descripcion,
          precio: element?.precio,
          disponible: element?.disponible,
          creditos: element?.item.creditos,
          cantidad: element?.item.cantidad,
          thumbnail: this.mediaPath + element?.thumbnail,
        });
        this.options.push(
          element.titulo
        )
      })
      this.filteredProducts = this.productsList;
      this.filteredName = this.options;

      this.loading = false;
    })
    .catch((error: any) => console.log(error))*/
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });

    this.currentCat = this.params.cat;
    this.currentSubCat = this.params.subcat;
    if (this.currentCat){
      this.currentCat = this.categoriesList.filter((c: any) => c.id == this.params.cat)[0];
      this.loadProductsByCategory(this.currentCat.id);
    }
  }

  openProductDetail(id: string): void{

    const navigationExtras: NavigationExtras = {
      queryParams: {
        producto: id,
      }
    };
    this.router.navigate(['/inicio/productos/detalle'], navigationExtras);
  }

  handleChange(checked: boolean, tag: any): void {
    if (checked) {
      this.selectedTags = [tag];
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    if (this.selectedTags.length === 0){
      this.loadMostRecent();
      this.currentSubCatName = null;
    } else {
      this.currentSubCatName = tag.nombre;
      this.loadProductsBySubCategory(tag.id);
    }
  }



  onChange(value: string): void {
    this.filteredName = this.options.filter((option: any) =>
    option.toLowerCase().includes(value?.toString().toLowerCase()) !== false);
  }

  filterProductsByName(name?: string): void{
   this.filteredProducts = this.productsList.filter((option: any) =>
    option.titulo.toLowerCase().includes(name?.toString().toLowerCase()) !== false);

  }

  addToCart(product: Producto) {
    if (this.usuario.getUserStatus()){
      this.carro.addToCart(product);
    } else {
      Swal.fire('Inicia sesión para agregar productos.')
    }
  }

}
