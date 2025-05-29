import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaludoService } from './saludo.service';

@ApiTags('Saludo')
@Controller('saludo')
export class SaludoController {
  constructor(private readonly saludoService: SaludoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener saludo' })
  @ApiResponse({ status: 200, description: 'Retorna un mensaje de saludo' })
  obtenerSaludo(): string {
    return this.saludoService.obtenerSaludo();
  }
}
