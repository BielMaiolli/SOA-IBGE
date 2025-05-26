import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  // Servir arquivos estáticos para o frontend
  app.useStaticAssets(join(__dirname, '..', 'src/frontend'));
  
  await app.listen(3000);
  console.log('Sistema SOA rodando em http://localhost:3000');
}
bootstrap();