import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons, 
  IonToggle, 
  IonItem, 
  IonIcon 
} from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonButtons, 
    IonToggle, 
    IonItem, 
    IonIcon, 
    RouterLink
  ]
})
export class InicioPage {
  isDarkMode: boolean = false;

  constructor() {
    // Registro de iconos de Ionic
    addIcons({ moonOutline, sunnyOutline });
    
    // Detectar si el usuario prefiere tema oscuro por defecto en el sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    this.applyTheme(this.isDarkMode);
  }

  toggleDarkMode(event: any): void {
    this.isDarkMode = event.detail.checked;
    this.applyTheme(this.isDarkMode);
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.classList.toggle('ion-palette-dark', dark);
    document.body.classList.toggle('dark', dark);
  }
}