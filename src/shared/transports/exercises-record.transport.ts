import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envsValues } from 'src/core/config/getEnvs';
import { RECORD_SERVICE_OPTIONS } from '../constants/record_service_options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: RECORD_SERVICE_OPTIONS.RECORD_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME,
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: RECORD_SERVICE_OPTIONS.RECORD_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class ExercisesRecordTransport {}
