import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3005);
}
bootstrap();
