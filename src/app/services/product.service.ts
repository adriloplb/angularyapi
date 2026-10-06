import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // Método que soporta paginación mediante query params de la API
  getProducts(limit: number = 10, skip: number = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}?limit=${limit}&skip=${skip}`);
  }
}