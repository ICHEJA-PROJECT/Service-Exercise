import { Module } from "@nestjs/common";
import { TypeLayoutController } from "./controllers/type_layout.controller";
import { LayoutController } from "./controllers/layout.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeLayoutEntity } from "./data/entities/type_layout.entity";
import { LayoutEntity } from "./data/entities/layout.entity";
import { TypeLayoutService } from "./services/type_layout.service";
import { TypeLayoutRepositoryImpl } from "./data/repositories/type_layout.repository.impl";
import { LayoutRepositoryImpl } from "./data/repositories/layout.repository.impl";
import { LayoutService } from "./services/layout.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TypeLayoutEntity, 
            LayoutEntity
        ])
    ],
    controllers: [
        TypeLayoutController, 
        LayoutController
    ],
    providers: [
        TypeLayoutRepositoryImpl, 
        LayoutRepositoryImpl, 
        TypeLayoutService, 
        LayoutService,
    ]
})

export class LayoutModule {}