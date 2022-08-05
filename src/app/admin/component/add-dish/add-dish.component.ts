import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';

interface Categories {
  value: number;
  name: string;
}

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css'],
})
export class AddDishComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDishComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product[]
  ) {}

  formAddProduct!: FormGroup;
  files: File[] = [];
  filter: string = '';

  values: Categories[] = [
    { value: 1, name: 'Entrada' },
    { value: 2, name: 'Plato Principal' },
    { value: 3, name: 'Bebida' },
    { value: 4, name: 'Postre' },
  ];

  ngOnInit(): void {
    this.formAddProduct = this.formBuilder.group({
      nombre: ['', Validators.maxLength(64)],
      categoria: [1, Validators.required],
      precio: [0.0, Validators.min(0.0)],
      costo: [0.0, Validators.min(0.0)],
    });
  }

  onSubmit() {
    if (this.formAddProduct.valid && this.files.length === 1) {
      const fileData = this.files[0];
      const data = new FormData();
      data.append('nombreComida', this.formAddProduct.value.nombre);
      data.append('precio', this.formAddProduct.value.precio);
      data.append('costo', this.formAddProduct.value.costo);
      data.append('idCategoria', this.formAddProduct.value.categoria);
      data.append('imagen', fileData);

      this.dialogRef.close(data);
    }
  }

  onSelect(event: any) {
    this.files = event.addedFiles;
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
