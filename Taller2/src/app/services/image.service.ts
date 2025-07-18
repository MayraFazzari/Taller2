import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private imgUrl = environment.img_url;

  obtenerUrlImagen(nombre: string): string {
    return `${this.imgUrl}${nombre}`;
  }
}
