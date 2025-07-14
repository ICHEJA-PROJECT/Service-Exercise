import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { envsValues } from "src/core/config/getEnvs";

@Module({
    imports: [
        HttpModule.register({
            baseURL: envsValues.UPLOAD_FILES_SERVICE_URL,
            timeout: 5000,
        }),
    ],
    exports: [HttpModule],
})

export class UploadFileTransport {}