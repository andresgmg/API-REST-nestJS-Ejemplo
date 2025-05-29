import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';

@Injectable()
export class AppService {  getMarkdownContent(fileName: string): string {
    try {
      const filePath = join(process.cwd(), fileName);
      const content = readFileSync(filePath, 'utf8');
      const htmlContent = marked.parse(content);
      
      // Agregamos algo de estilo básico para mejorar la presentación
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <title>API REST NestJS - Documentación</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                line-height: 1.6;
                max-width: 900px;
                margin: 0 auto;
                padding: 2rem;
                color: #333;
              }
              pre {
                background: #f6f8fa;
                padding: 1rem;
                border-radius: 6px;
                overflow-x: auto;
              }
              code {
                font-family: 'Consolas', 'Monaco', monospace;
              }
              h1, h2, h3 {
                margin-top: 2rem;
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>
            ${htmlContent}
          </body>
        </html>
      `;
    } catch (error) {
      return 'Error al cargar la documentación';
    }
  }
}
