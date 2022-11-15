import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerSubscriptionsModule } from './customer-subscription/customer-subscriptions.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TeasModule } from './teas/tea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    TeasModule,
    CustomerSubscriptionsModule
  ],
  controllers: [
    AppController

  ],
  providers: [
    AppService
  ]
})
export class AppModule { }
