/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from './app/app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.enableCors();
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://brokenleaf.us:${port}/${globalPrefix}`
  );
}


bootstrap();
