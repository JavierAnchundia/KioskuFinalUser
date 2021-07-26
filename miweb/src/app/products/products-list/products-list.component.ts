import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria/subcategoria.service';

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
  public currentCat: any = '';
  public currentSubCat: any = '';
  selectedTags: string[] = [];
  public nameValue?: string;

  constructor(
    private categorias: CategoriaService,
    private subcategoria: SubcategoriaService,
    private producto: ProductoService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    if (this.route.snapshot.queryParams.cat) { // * En caso de que el url tenga parametros
      this.getRouteParams();
    } else {
      this.loadMostRecent();
    }
  }

  loadCategories(): void{
    this.categorias.retrieveCategories()
    .then(categ => {
      this.categoriesList = categ;
      this.filteredOptions = this.categoriesList;

    })
    .catch((error: any) => console.log(error))

  }

  loadSubcategories(id: string): void{
    this.subcategoria.retrieveSubcategoriesByCat(id)
    .then(subcat => this.subCatList = subcat)
    .catch((error: any) => console.log(error))
  }

  loadMostRecent(): void{
    this.loading = true;
    this.producto.retrieveMostRecent()
    .then(prod => {
      console.log(prod);
      this.productsList = prod[0];
      this.loading = false;
    })
    .catch((error: any) => console.log(error))
  }

  onChangeCategory(value: any): void {
    console.log(value);
    this.filteredOptions = this.categoriesList.filter((option: any) =>
    option.nombre.toLowerCase().includes(value.toString().toLowerCase()) !== false);
    if (value[0] !== undefined){
      this.currentCat = value[0];
      this.productsList= [];
      this.loading = true;
      this.router.navigate(['.'], {
        relativeTo: this.route, queryParams: {
          cat: this.currentCat.id,
        }, replaceUrl: true
      });
      this.loadSubcategories(this.currentCat.id);
      this.loadProductsByCategory(this.currentCat.id);
    } else {
      this.productsList= [];
      this.subCatList = [];
      this.currentCat = '';
      this.router.navigate(['.'], {
        relativeTo: this.route, queryParams: {
          cat: this.currentCat.id,
        }, replaceUrl: true
      });
      this.loadMostRecent();
    }
  }

  loadProductsByCategory(id: string): void{
    this.producto.retrieveProductsByCat(id)
    .then(prod => {
      console.log(prod);
      this.productsList = prod[0];
      this.loading = false;
    })
    .catch((error: any) => console.log(error))
  }

  loadProductsBySubCategory(id: string): void{
    this.producto.retrieveProductsBySubcat(id)
    .then(prod => {
      console.log(prod);
      this.productsList = prod[0];
      this.loading = false;
    })
    .catch((error: any) => console.log(error))
  }

  getRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });

    this.currentCat = this.params.cat;
    this.currentSubCat = this.params.subcat;
    if (this.currentCat && this.currentSubCat){

    } else {
      this.loadProductsByCategory(this.currentCat);
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
    this.loadProductsBySubCategory(tag.id);
  }

  onChange(value: string): void {
    console.log(value);
  }


}
