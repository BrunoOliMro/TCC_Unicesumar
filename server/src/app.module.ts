import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';
import { CoreModule } from './core/core.module';
import { UtilsModule } from './utils/utils.module';
import { dbEntities } from './database/entities';
import { CompaniesModule } from './companies/companies.module';
import { ItemModule as CoreItemModule } from './core/item/item.module';
import { OdfModule as CoreOdfModule } from './core/odf/odf.module';
import { StockModule as CoreStockModule } from './core/stock/stock.module';
import { MachineModule as CoreMachineModule } from './core/machine/machine.module';
import { MachineModule } from './machine/machine.module';
import { ItemModule } from './item/item.module';
import { SettingsModule } from './settings/settings.module';
import { GlobalModule } from './global/global.module';
import { AuthModule } from './auth/auth.module';
import { OdfModule } from './odf/odf.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthGuard, ResourceGuard, RoleGuard, KeycloakConnectModule } from 'nest-keycloak-connect';

import { join } from "node:path";
import { StockModule } from './stock/stock.module';
import { ToolsModule } from './tools/tools.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { SseAuthorization } from './global/middlewares/sse_auth.middleware';
import { PointModule } from './point/point.module';
import { CheckCompany } from './global/middlewares/check_company.middleware';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      serveRoot: "/assets",
      rootPath: join(__dirname, "../web", "assets")
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '../public')
    }),
    ServeStaticModule.forRoot({
      serveRoot: "/static",
      rootPath: join(__dirname, '..', 'static'),
    }),
    KeycloakConnectModule.register({
      authServerUrl: process.env['KC_SERVER_URL'],
      realm: process.env['KC_REALM'],
      clientId: process.env['KC_CLIENT_ID'],
      secret: process.env['KC_CLIENT_SECRET'],
      bearerOnly: true
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature(dbEntities),
    DatabaseModule,
    CoreModule,
    CoreStockModule,
    UtilsModule,
    ItemModule,
    OdfModule,
    StockModule,
    MachineModule,
    SettingsModule,
    CompaniesModule,
    CoreMachineModule,
    CoreItemModule,
    GlobalModule,
    AuthModule,
    CoreOdfModule,
    ToolsModule,
    UsersModule,
    PointModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SseAuthorization)
      .forRoutes("*");
    consumer
      .apply(CheckCompany)
      .forRoutes("*")
  }
}
