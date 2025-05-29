import { Module } from '@nestjs/common';
import { SaludoController } from './saludo.controller';
import { SaludoService } from './saludo.service';

@Module({
  controllers: [SaludoController],
  providers: [SaludoService],
})
export class SaludoModule {}
