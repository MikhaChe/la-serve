import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT_SERVER || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('microservice endpoints interface')
    .setDescription('Documentation for REST API')
    .setVersion('1.0.0')
    .addTag('for Telegram Bots')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/bot/docs', app, document)

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();

