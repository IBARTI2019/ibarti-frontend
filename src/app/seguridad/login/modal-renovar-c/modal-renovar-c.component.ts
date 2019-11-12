import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../servicios/interface';

@Component({
  selector: 'app-modal-renovar-c',
  templateUrl: './modal-renovar-c.component.html',
  styleUrls: ['./modal-renovar-c.component.css']
})
export class ModalRenovarCComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalRenovarCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
