import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaludoModule } from './modulos/saludo/saludo.module';

@Module({
  imports: [SaludoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
