import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PREFERENCES_SERVICE_OPTIONS } from "../constants/preferences_service_options";
import { envsValues } from "src/core/config/getEnvs";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME,
                transport: Transport.RMQ,
                options: {
                    urls: envsValues.BROKER_HOSTS,
                    queue: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_QUEUE,
                    queueOptions: {
                        durable: true,
                    }
                }
            }
        ])
    ],
    exports: [
        ClientsModule.register([
            {
                name: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_SERVICE_NAME,
                transport: Transport.RMQ,
                options: {
                    urls: envsValues.BROKER_HOSTS,
                    queue: PREFERENCES_SERVICE_OPTIONS.PREFERENCES_QUEUE,
                    queueOptions: {
                        durable: true,
                    }
                }
            }
        ])
    ]
})
export class PreferencesTransport {}