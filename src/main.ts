import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Service-Exercise")
    .setDescription("Service to manage all exercise and relations in AprendIA platform")
    .setVersion("1.0")
    .build();
  
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);
    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
