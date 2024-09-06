import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GlobalErrorInterceptor, HttpExceptionFilter } from "./global/interceptors/global.error.interceptors";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api/v1");

  app.enableCors({
    origin: process.env['CORS_ROUTES'].split(',')
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new GlobalErrorInterceptor());

  await app.listen(5000);
}
bootstrap();
