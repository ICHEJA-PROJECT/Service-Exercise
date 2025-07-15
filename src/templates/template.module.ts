import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeInstructionMediaEntity } from "./data/entities/type_instruction_media.entity";
import { SkillEntity } from "./data/entities/skill.entity";
import { TemplateEntity } from "./data/entities/template.entity";
import { TemplateInstructionMediaEntity } from "./data/entities/template_instruction_media.entity";
import { TemplateSkillEntity } from "./data/entities/template_skill.entity";
import { TypeInstructionMediaController } from "./controllers/type_instruction_media.controller";
import { SkillController } from "./controllers/skill.controller";
import { TemplateController } from "./controllers/template.controller";
import { TemplateInstructionMediaController } from "./controllers/template_instruction_media.controller";
import { TemplateSkillController } from "./controllers/template_skill.controller";
import { TypeInstructionMediaRepositoryImpl } from "./data/repositories/type_instruction_media.repository.impl";
import { TypeInstructionMediaService } from "./services/type_instruction_media.service";
import { SkillRepositoryImpl } from "./data/repositories/skill.repository.impl";
import { SkillService } from "./services/skill.service";
import { TopicEntity } from "src/topics/data/entities/topic.entity";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";
import { TemplateRepositoryImpl } from "./data/repositories/template.repository.impl";
import { TemplateService } from "./services/template.service";
import { TemplateInstructionMediaRepositoryImpl } from "./data/repositories/template_instruction_media.repository.impl";
import { TemplateSkillService } from "./services/template_skill.service";
import { TemplateInstructionMediaService } from "./services/template_instruction_media.service";
import { TemplateSkillRepositoryImpl } from "./data/repositories/template_skill.repository.impl";
import { UploadFileTransport } from "./transports/upload-file.transport";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TopicEntity,
            LayoutEntity,
            TypeInstructionMediaEntity,
            SkillEntity,
            TemplateEntity,
            TemplateInstructionMediaEntity,
            TemplateSkillEntity
        ]),
        UploadFileTransport
    ],
    controllers: [
        TypeInstructionMediaController, 
        SkillController,
        TemplateController,
        TemplateInstructionMediaController,
        TemplateSkillController
    ],
    providers: [
        TypeInstructionMediaRepositoryImpl,
        SkillRepositoryImpl,
        TemplateRepositoryImpl,
        TemplateInstructionMediaRepositoryImpl,
        TemplateSkillRepositoryImpl,
        TypeInstructionMediaService,
        SkillService,
        TemplateService,
        TemplateInstructionMediaService,
        TemplateSkillService
    ],
    exports: [TemplateService, SkillService, TemplateSkillService]
})

export class TemplateModule {}