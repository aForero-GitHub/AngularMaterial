import { Vehiculos } from './../../../_model/Vehiculos';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-asociaciondialogo',
    templateUrl: './asociaciondialogo.component.html',
    styleUrls: ['./asociaciondialogo.component.css']
})
export class AsociaciondialogoComponent implements OnInit {

    idVehiculo: number;

    constructor(public dialogRef: MatDialogRef<AsociaciondialogoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Vehiculos) { }

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
