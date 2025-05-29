# API REST con NestJS - Guía de Desarrollo

Este proyecto es una API REST desarrollada con NestJS que implementa las mejores prácticas de arquitectura y desarrollo.

## Estructura del Proyecto

```
API-REST-NESTJS-EJEMPLO/
├── src/
│   ├── modulos/           # Carpeta principal de módulos
│   │   └── saludo/        # Módulo de ejemplo
│   │       ├── saludo.controller.ts  # Controlador del módulo
│   │       ├── saludo.module.ts      # Definición del módulo
│   │       └── saludo.service.ts     # Servicios del módulo
│   ├── app.module.ts      # Módulo principal de la aplicación
│   └── main.ts           # Punto de entrada de la aplicación
├── test/                 # Pruebas e2e
└── package.json         # Dependencias y scripts
```

## Características Principales

- 📚 Documentación automática con Swagger (OpenAPI)
- 🏗️ Arquitectura modular y escalable
- 🔍 Estructura clara y organizada
- ✨ Implementación de mejores prácticas
- 📖 Página de inicio con documentación dinámica desde README.md

## Documentación de la API

La documentación Swagger está disponible en:
```
http://localhost:3000/docs
```

## Instalación y Ejecución

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run start:dev
```

## Guía para Crear Nuevos Módulos

### 1. Crear la Estructura de Carpetas

Para un nuevo módulo llamado 'ejemplo':
```bash
mkdir src/modulos/ejemplo
```

### 2. Crear los Archivos del Módulo

#### 2.1 Crear el Controlador (ejemplo.controller.ts)
```typescript
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EjemploService } from './ejemplo.service';

@ApiTags('Ejemplo')
@Controller('ejemplo')
export class EjemploController {
  constructor(private readonly ejemploService: EjemploService) {}

  @Get()
  @ApiOperation({ summary: 'Descripción de la operación' })
  obtenerEjemplo() {
    return this.ejemploService.obtenerEjemplo();
  }
}
```

#### 2.2 Crear el Servicio (ejemplo.service.ts)
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class EjemploService {
  obtenerEjemplo() {
    return 'Lógica del servicio aquí';
  }
}
```

#### 2.3 Crear el Módulo (ejemplo.module.ts)
```typescript
import { Module } from '@nestjs/common';
import { EjemploController } from './ejemplo.controller';
import { EjemploService } from './ejemplo.service';

@Module({
  controllers: [EjemploController],
  providers: [EjemploService],
})
export class EjemploModule {}
```

### 3. Registrar el Módulo

En src/app.module.ts, importar y registrar el nuevo módulo:
```typescript
import { EjemploModule } from './modulos/ejemplo/ejemplo.module';

@Module({
  imports: [
    // ...otros módulos
    EjemploModule
  ],
})
export class AppModule {}
```

## Página de Inicio con README.md

El proyecto incluye una característica especial que convierte el contenido del README.md en una página de inicio HTML estilizada. Para implementar esto:

### Dependencias Necesarias
```bash
npm install marked
```

### Estructura de Archivos
- `app.service.ts` - Servicio para leer y convertir el README.md
- `app.controller.ts` - Controlador que sirve la página HTML

### Ejemplo de Implementación

#### Service (app.service.ts)
```typescript
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as marked from 'marked';

@Injectable()
export class AppService {
  getReadmeContent(): string {
    try {
      const readmePath = join(process.cwd(), 'README.md');
      const readmeContent = readFileSync(readmePath, 'utf8');
      const htmlContent = marked.parse(readmeContent);
      
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>API REST NestJS - Documentación</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
                max-width: 900px;
                margin: 0 auto;
                padding: 2rem;
              }
              // ... más estilos ...
            </style>
          </head>
          <body>${htmlContent}</body>
        </html>
      `;
    } catch (error) {
      return 'Error al cargar la documentación';
    }
  }
}
```

#### Controller (app.controller.ts)
```typescript
import { Controller, Get, Header } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Documentación')
@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  @ApiOperation({ summary: 'Obtener la documentación principal del proyecto' })
  getDocumentation(): string {
    return this.appService.getReadmeContent();
  }
}
```

### Rutas Disponibles
- `/` - Muestra la documentación del README.md en formato HTML
- `/docs` - Muestra la documentación Swagger de la API

## Convenciones y Buenas Prácticas

### Estructura de Archivos
- Usar nombres en minúsculas
- Separar palabras con puntos
- Sufijos descriptivos: `.controller.ts`, `.service.ts`, `.module.ts`

### Documentación Swagger
- Usar `@ApiTags()` para agrupar endpoints
- Documentar operaciones con `@ApiOperation()`
- Describir respuestas con `@ApiResponse()`

### Organización del Código
- Un módulo por funcionalidad
- Separar lógica de negocio en servicios
- Mantener controladores ligeros
- Usar DTOs para validación de datos

## Ejemplos de Uso

El módulo 'saludo' incluido en el proyecto sirve como ejemplo de implementación. Puedes encontrarlo en:
```
src/modulos/saludo/
```

## Tips de Desarrollo

1. **Validación de Datos**: Usar class-validator y class-transformer
2. **Manejo de Errores**: Implementar filtros de excepciones
3. **Documentación**: Mantener Swagger actualizado
4. **Testing**: Escribir pruebas para cada nuevo módulo

## Comandos Útiles

```bash
# Crear un nuevo módulo
nest generate module modulos/nombre-modulo

# Crear un nuevo controlador
nest generate controller modulos/nombre-modulo

# Crear un nuevo servicio
nest generate service modulos/nombre-modulo
```
