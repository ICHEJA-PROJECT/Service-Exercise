import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseEntity } from "./data/entities/exercise.entity";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { ExerciseController } from "./controller/exercise.controller";
import { TopicService } from "src/topics/services/topic.service";
import { TemplateService } from "src/templates/services/template.service";
import { SkillService } from "src/templates/services/skill.service";
import { ExerciseRepositoryImpl } from "./data/repositories/exercise.repository.impl";
import { ExerciseService } from "./services/exercise.service";
import { TopicModule } from "src/topics/topic.module";
import { TemplateModule } from "src/templates/template.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TemplateEntity, 
            ExerciseEntity
        ]), 
        TopicModule, 
        TemplateModule
    ],
    providers: [ExerciseRepositoryImpl, ExerciseService],
    controllers: [ExerciseController]
})

export class ExerciseModule {}