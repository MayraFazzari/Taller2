import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {
  @Input() producto: any;
  @Input() cantidad: number = 1;
  @Input() imagen: string = '';
  @Output() sumar = new EventEmitter<void>();
  @Output() restar = new EventEmitter<void>();
  @Output() agregar = new EventEmitter<void>();
}
