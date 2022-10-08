import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/filters/exception.filter';
import { RolesGuard, JwtGuard } from './utils/guards';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new JwtGuard(new Reflector()));
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000, process.env.HOST_URL);
}
bootstrap();
