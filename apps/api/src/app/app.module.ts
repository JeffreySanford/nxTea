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
    MongooseModule.forRoot('mongodb://teaadmin:p4ssw0rd@brokenleaf.us:27017/admin', {
      dbName: 'brokenleaf'
    }),
    MongooseModule.forFeature([
      { name: 'Department', schema: DepartmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Tea', schema: TeaSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
    DepartmentsModule,
    TeasModule,
    UserModule,
    CustomerSubscriptionsModule,
  ],
  controllers: [
    AppController

  ],
  providers: [
    AppService
  ]
})
export class AppModule { }
