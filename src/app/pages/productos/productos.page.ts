import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Variables de Paginación (Reto)
  limit = 5;
  skip = 0;
  currentPage = 1;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productService.getProducts(this.limit, this.skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
      }
    });
  }

  // Cálculo del Stock Valorado: unidades * precio - descuento aplicable
  calcularStockValorado(product: Product): number {
    const discount = product.discountPercentage ?? 0;
    const precioConDescuento = product.price * (1 - discount / 100);
    return Math.round(product.stock * precioConDescuento * 100) / 100;
  }

  // Métodos de Paginación
  siguientePagina(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.currentPage++;
      this.loadProducts();
    }
  }

  paginaAnterior(): void {
    if (this.skip >= this.limit) {
      this.skip -= this.limit;
      this.currentPage--;
      this.loadProducts();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }
}