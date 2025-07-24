import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { envsValues } from "src/core/config/getEnvs";
import { PreferencesService } from "./services/preferences.service";

@Module({
    imports: [
        HttpModule.register({
            baseURL: envsValues.PREFERENCES_SERVICE_URL,
            timeout: 5000
        }),
    ],
    providers: [PreferencesService],
    exports: [PreferencesService]
})
export class GetPreferencesTransport {}