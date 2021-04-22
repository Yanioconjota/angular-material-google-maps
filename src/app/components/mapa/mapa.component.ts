import { Component, OnInit } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 34.0971117;
  lng = -118.35786938667297;

  constructor(private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    // const nuevoMarcador = new Marcador(51.678418, 7.809007);

    // this.marcadores.push(nuevoMarcador);

    if (!localStorage.getItem('marcadores') || localStorage.getItem('marcadores') === '[]') {
      const nuevoMarcador = new Marcador(this.lat, this.lng);
      this.marcadores.push(nuevoMarcador);
      this.guardarStorage();
    } 
    this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento) {
    console.log('evento:', evento);
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado 📍✔️', 'Cerrar', { duration: 3000 });
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number){
    console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado 📍❌', 'Cerrar', { duration: 3000 });
  }

  editarMarcador(marcador: Marcador) {
    console.log(marcador);
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.marcadores = result;
      // console.log(result)
      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.snackBar.open('Marcador actualizado 📍✏️', 'Cerrar', { duration: 3000 });
    });
  }

}
