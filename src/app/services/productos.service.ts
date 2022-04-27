import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: ProductoInterface[] = [];
  productoFiltrado: ProductoInterface[] = [];

  cargando = true;

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
      this.http.get('https://angular-html-a0649-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp;
          this.cargando = false;
        });
  }

  getProducto(id: String) {
    return this.http.get(
      `https://angular-html-a0649-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length == 0){
      this.cargarProductos();
      this.filtrarProductos(termino);      
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    console.log(termino);
    this.productoFiltrado = [];
    this.productos.forEach( prod => {
      console.log("categoria: " + prod.categoria);
      if (prod.categoria.toLowerCase().indexOf(termino.toLowerCase()) >= 0 || prod.titulo.toLowerCase().indexOf(termino.toLowerCase()) >= 0){
        this.productoFiltrado.push(prod);
      }
    });
    console.log(this.productoFiltrado);
  }
}
