import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos : ProductoInterface[] = [];

  cargando = true;

  constructor(private http : HttpClient) { 
    this.cargarProductos();
    this.cargando = false;
  }

  private cargarProductos(){
    this.http.get('https://angular-html-a0649-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe((resp : any) => {            
      this.productos = resp;
    });
  }
}
