import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../servicios/interface';
@Component({
  selector: 'app-modal-recuperar-c',
  templateUrl: './modal-recuperar-c.component.html',
  styleUrls: ['./modal-recuperar-c.component.css']
})
export class ModalRecuperarCComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalRecuperarCComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
