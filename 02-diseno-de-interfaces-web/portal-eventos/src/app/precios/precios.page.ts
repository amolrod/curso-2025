import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
         IonButtons, IonBackButton, IonCard, IonCardHeader, 
         IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.page.html',
  styleUrls: ['./precios.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
            IonButtons, IonBackButton, IonCard, IonCardHeader,
            IonCardTitle, IonCardContent, CommonModule, RouterLink]
})
export class PreciosPage {
  tarifas = [
    {
      tipo: 'Entrada Normal',
      precio: 30,
      descripcion: 'Acceso general',
      caracteristicas: ['Entrada al evento', 'Asiento estándar', 'Acceso a zonas comunes']
    },
    {
      tipo: 'Entrada VIP',
      precio: 75,
      descripcion: 'Experiencia premium',
      caracteristicas: ['Asiento preferente', 'Acceso zona VIP', 'Bebida de bienvenida', 'Parking gratuito'],
      destacado: true
    },
    {
      tipo: 'Pase de Temporada',
      precio: 150,
      descripcion: 'Acceso a todos los eventos',
      caracteristicas: ['Acceso ilimitado', 'Descuentos especiales', 'Prioridad en reservas', 'Merchandising gratis']
    }
  ];

  ofertas = [
    { titulo: 'Descuento Estudiante', descuento: '20%', condicion: 'Con carnet universitario' },
    { titulo: 'Grupo 4+', descuento: '15%', condicion: 'Reservando 4 o más entradas' },
    { titulo: 'Early Bird', descuento: '25%', condicion: 'Compra anticipada (30 días)' }
  ];

  constructor() { }
}
