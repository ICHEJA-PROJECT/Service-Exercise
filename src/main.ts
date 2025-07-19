import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envsValues } from './core/config/getEnvs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EXERCISE_SERVICE_OPTIONS } from './shared/constants/exercise_service_options';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Service-Exercise');
  try {
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
    logger.log('Exercise microservice is running...');
  } catch (error) {
    logger.error('Error starting Exercise microservice', error);
  }
}
bootstrap();
