import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { PrismaService } from '@/shared/services';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
void bootstrap();
