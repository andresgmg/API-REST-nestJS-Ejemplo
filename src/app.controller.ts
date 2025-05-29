import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Documentación')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  @ApiOperation({ 
    summary: 'Obtener la documentación principal del proyecto',
    description: 'Retorna una página HTML generada dinámicamente a partir del README.md del proyecto. ' +
                'La página incluye estilos CSS para una mejor presentación y el contenido markdown es convertido a HTML.'
  })
  @ApiResponse({
    status: 200,
    description: 'Página HTML con la documentación del proyecto',
    content: {
      'text/html': {
        example: '<!DOCTYPE html><html><head><title>API REST NestJS - Documentación</title>...</html>'
      }
    }
  })
  getDocumentation(): string {
    return this.appService.getMarkdownContent('README.md');
  }

  @Get('guia')
  @Header('Content-Type', 'text/html')
  @ApiOperation({ 
    summary: 'Obtener la guía detallada del proyecto',
    description: 'Retorna una página HTML generada dinámicamente a partir del GUIA.md del proyecto. ' +
                'Contiene información detallada sobre la estructura y desarrollo del proyecto.'
  })
  @ApiResponse({
    status: 200,
    description: 'Página HTML con la guía detallada del proyecto',
    content: {
      'text/html': {
        example: '<!DOCTYPE html><html><head><title>API REST NestJS - Documentación</title>...</html>'
      }
    }
  })
  getGuide(): string {
    return this.appService.getMarkdownContent('GUIA.md');
  }
}
