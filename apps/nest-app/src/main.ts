import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from "@nestjs/platform-express";
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Application Service')
    .setDescription('The tenant API description')
    .setVersion('1.0')
    // .addGlobalParameters({
    //   in: 'header',
    //   required: true,
    //   name: 'x-tenant-id',
    // })
    .addBearerAuth()
    .build();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3005);
}
bootstrap();
