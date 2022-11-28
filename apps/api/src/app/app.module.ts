import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CustomerSubscriptionsModule } from './customer-subscription/customer-subscriptions.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TeasModule } from './teas/tea.module';
import { TeaSchema } from './entities/tea.entity';
import { DepartmentsModule } from './departments/departments.module';
import { DepartmentSchema } from './entities/department.entity';
import { UserModule } from './authentication/user.module';
import { UserSchema } from './entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/brokenleaf'),
    MongooseModule.forFeature([
      { name: 'Department', schema: DepartmentSchema },
    ]),
    DepartmentsModule,
    MongooseModule.forFeature([
      { name: 'Tea', schema: TeaSchema },
    ]),
    TeasModule,
    UserModule,
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
