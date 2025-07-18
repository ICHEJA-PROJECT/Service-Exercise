import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envsValues } from './core/config/getEnvs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from './shared/constants/exercise_service_options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: envsValues.BROKER_HOSTS,
        queue: EXERCISE_SERVICE_OPTIONS.EXERCISE_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
