import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
         IonButtons, IonBackButton, IonItem, IonLabel, IonInput, 
         IonSelect, IonSelectOption, IonList, IonCard, IonCardHeader,
         IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
            IonButtons, IonBackButton, IonItem, IonLabel, IonInput, 
            IonSelect, IonSelectOption, IonList, IonCard, IonCardHeader,
            IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class ReservasPage {
  eventos = [
    { id: 1, nombre: 'Festival Rock 2025', fecha: '15 Nov 2025', precio: 45 },
    { id: 2, nombre: 'Obra El Sueño', fecha: '18 Nov 2025', precio: 30 },
    { id: 3, nombre: 'Final Copa Regional', fecha: '30 Nov 2025', precio: 60 },
    { id: 4, nombre: 'Tech Summit 2025', fecha: '10 Dic 2025', precio: 50 },
    { id: 5, nombre: 'Concierto Jazz Night', fecha: '5 Dic 2025', precio: 25 },
  ];

  reserva = {
    nombre: '',
    email: '',
    telefono: '',
    eventoId: '',
    cantidad: 1
  };

  reservaEnviada = false;

  get eventoSeleccionado() {
    if (!this.reserva.eventoId) return null;
    return this.eventos.find(e => e.id === parseInt(this.reserva.eventoId));
  }

  get totalPrecio() {
    if (!this.eventoSeleccionado) return 0;
    return this.eventoSeleccionado.precio * this.reserva.cantidad;
  }

  enviarReserva() {
    if (this.reserva.nombre && this.reserva.email && this.reserva.eventoId) {
      this.reservaEnviada = true;
      console.log('Reserva enviada:', this.reserva);
    }
  }

  nuevaReserva() {
    this.reservaEnviada = false;
    this.reserva = {
      nombre: '',
      email: '',
      telefono: '',
      eventoId: '',
      cantidad: 1
    };
  }

  constructor() { }
}
