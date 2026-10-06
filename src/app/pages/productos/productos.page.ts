import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton, 
  IonSpinner, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonBadge, 
  IonChip, 
  IonIcon 
} from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { star, cubeOutline, cashOutline, resizeOutline } from 'ionicons/icons';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe, 
    RouterLink, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons, 
    IonBackButton, 
    IonSpinner, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonButton, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonBadge, 
    IonChip, 
    IonIcon
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Parámetros de Paginación
  limit = 6;
  skip = 0;
  currentPage = 1;

  constructor() {
    addIcons({ star, cubeOutline, cashOutline, resizeOutline });
  }

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
        this.error = 'No se han podido cargar los productos desde la API REST.';
        this.loading = false;
      }
    });
  }

  // Fórmula de Stock Valorado: unidades * (precio con descuento)
  calcularStockValorado(product: Product): number {
    const discount = product.discountPercentage ?? 0;
    const precioConDescuento = product.price * (1 - discount / 100);
    return Math.round(product.stock * precioConDescuento * 100) / 100;
  }

  // Controladores de Paginación
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