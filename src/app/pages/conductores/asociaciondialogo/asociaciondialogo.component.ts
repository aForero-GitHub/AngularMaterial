/*import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductores } from './../../../_model/Conductores';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-asociaciondialogo',
  templateUrl: './asociaciondialogo.component.html',
  styleUrls: ['./asociaciondialogo.component.css']
})
export class AsociaciondialogoComponent implements OnInit {

  idUsuario: number;

  constructor(public dialogRef: MatDialogRef<AsociaciondialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Conductores) { }

  ngOnInit(): void {
    console.log(this.data);
    }

    cerrarDialogo() {
        this.dialogRef.close({event: 'Cancel'});
    }

    eliminar() {
        this.dialogRef.close({event: 'Elimino', data: '243'});
    }
}
*/
