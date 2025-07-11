import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResourceEntity } from "./data/entities/resource.entity";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";
import { TopicEntity } from "./data/entities/topic.entity";
import { TopicSequenceEntity } from "./data/entities/topic_sequence.entity";
import { UnitEntity } from "./data/entities/unit.entity";
import { ResourceService } from "./services/resource.service";
import { ResourceRepositoryImpl } from "./data/repositories/resource.repository.impl";
import { TopicService } from "./services/topic.service";
import { TopicController } from "./controllers/topic.controller";
import { ResourceController } from "./controllers/resource.controller";
import { TopicSequenceController } from "./controllers/topic_sequence.controller";
import { UnitController } from "./controllers/unit.controller";
import { TopicRepositoryImpl } from "./data/repositories/topic.repository.impl";
import { GetAvaibleTopicsUseCase } from "./domain/usecases/GetAvaibleTopicsUseCase";
import { TopicSequenceRepositoryImpl } from "./data/repositories/topic_sequence.repository.impl";
import { TopicSequenceService } from "./services/topic_sequence.service";
import { UnitRepositoryImpl } from "./data/repositories/unit.repository.impl";
import { UnitService } from "./services/unit.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UnitEntity,
            ResourceEntity, 
            LayoutEntity, 
            TopicEntity, 
            TopicSequenceEntity, 
        ]),
    ],
    providers: [
        TopicSequenceRepositoryImpl, 
        TopicRepositoryImpl,
        GetAvaibleTopicsUseCase, 
        TopicService, 
        ResourceRepositoryImpl, 
        ResourceService, 
        TopicSequenceService, 
        UnitRepositoryImpl, 
        UnitService
    ],
    controllers: [
        TopicController, 
        ResourceController, 
        TopicSequenceController, 
        UnitController
    ],
    exports: [TopicService]
})

export class TopicModule {}