import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
         IonSearchbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
            IonSearchbar, IonSegment, IonSegmentButton, IonLabel, RouterLink,
            CommonModule, FormsModule],
})
export class HomePage {
  searchText = '';
  categoriaSeleccionada = 'todos';

  eventos = [
    {
      id: 1,
      titulo: 'Festival Rock 2025',
      fecha: '15 Nov 2025',
      lugar: 'Estadio Nacional',
      precio: 45,
      categoria: 'musica',
      imagen: '../assets/evento1.jpg'
    },
    {
      id: 2,
      titulo: 'Obra El Sueño',
      fecha: '18 Nov 2025',
      lugar: 'Teatro Real',
      precio: 30,
      categoria: 'teatro',
      imagen: 'assets/evento2.jpg'
    },
    {
      id: 3,
      titulo: 'Final Copa Regional',
      fecha: '30 Nov 2025',
      lugar: 'Estadio Municipal',
      precio: 60,
      categoria: 'deportes',
      imagen: 'assets/evento3.jpg'
    },
    {
      id: 4,
      titulo: 'Tech Summit 2025',
      fecha: '10 Dic 2025',
      lugar: 'IFEMA Madrid',
      precio: 50,
      categoria: 'tecnologia',
      imagen: 'assets/evento4.jpg'
    },
    {
      id: 5,
      titulo: 'Concierto Jazz Night',
      fecha: '5 Dic 2025',
      lugar: 'Sala Moby Dick',
      precio: 25,
      categoria: 'musica',
      imagen: 'assets/evento5.jpg'
    },
    {
      id: 6,
      titulo: 'Partido Baloncesto',
      fecha: '12 Dic 2025',
      lugar: 'Pabellón Central',
      precio: 35,
      categoria: 'deportes',
      imagen: 'assets/evento6.jpg'
    }
  ];

  get eventosFiltrados() {
    let resultado = this.eventos;
    
    // Filtrar por categoría
    if (this.categoriaSeleccionada !== 'todos') {
      resultado = resultado.filter(e => e.categoria === this.categoriaSeleccionada);
    }
    
    // Filtrar por búsqueda
    if (this.searchText && this.searchText.trim() !== '') {
      const busqueda = this.searchText.toLowerCase();
      resultado = resultado.filter(e => 
        e.titulo.toLowerCase().includes(busqueda) ||
        e.lugar.toLowerCase().includes(busqueda)
      );
    }
    
    return resultado;
  }

  cambiarCategoria(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }

  buscar(event: any) {
    this.searchText = event.detail.value || '';
  }

  constructor() {}
}
