import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

@Module({
    imports: [
        HttpModule.register({
            baseURL: "http://localhost:8080",
            timeout: 5000,
        }),
    ],
    exports: [HttpModule],
})

export class UploadFileTransport {}