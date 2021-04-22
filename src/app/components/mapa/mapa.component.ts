import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor() {
    const nuevoMarcador = new Marcador(51.678418, 7.809007);

    this.marcadores.push(nuevoMarcador);
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento) {
    console.log(evento);

    const coords: { lat: number, lng: number } = evento.coords;

    const nuevoMarcador = new Marcador(coords.lat, coords.lng);

    this.marcadores.push(nuevoMarcador);
  }

}
