import { Injectable } from '@nestjs/common';

@Injectable()
export class SaludoService {
  obtenerSaludo(): string {
    return '¡Hola Mundo desde NestJS!';
  }
}
