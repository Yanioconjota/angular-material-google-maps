import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marcador } from 'src/app/classes/marcador.class';


@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.scss']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<MapaEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public marcador: Marcador,
              public fb: FormBuilder) {
                console.log(marcador);
                this.forma = fb.group({
                  'titulo': marcador.titulo,
                  'desc': marcador.desc
                });
              }

  ngOnInit(): void {
    console.log('marcador recibido!',this.marcador)
  }

  guardarCambios(){
    console.log('algo')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
