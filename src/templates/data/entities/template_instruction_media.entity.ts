import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { TypeInstructionMediaI } from "src/templates/domain/entitiesI/TypeInstructionMediaI";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TemplateEntity } from "./template.entity";
import { TypeInstructionMediaEntity } from "./type_instruction_media.entity";

@Entity("reactivo_instruccion_media")
export class TemplateInstructionMediaEntity implements TemplateInstructionMediaI {
    @PrimaryColumn({ name: "id_reactivo", type: "number", nullable: false})
    templateId: number;

    @PrimaryColumn({ name: "id_tipo_media", type: "number", nullable: false})
    typeMediaId: number;

    @ManyToOne(() => TemplateEntity, template => template.instructionMedias)
    @JoinColumn({ name: "id_reactivo"})
    template: TemplateI;
    @ManyToOne(() => TypeInstructionMediaEntity, typeInstructionMedia => typeInstructionMedia.instructionsMedias)
    @JoinColumn({name: "id_tipo_media"})
    typeMedia: TypeInstructionMediaI;
    @Column({name: "ruta_media", type: "varchar", length: 64, nullable: false})
    pathMedia: string;
}