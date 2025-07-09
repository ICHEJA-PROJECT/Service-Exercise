import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { TypeInstructionMediaI } from "src/templates/domain/entitiesI/TypeInstructionMediaI";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TemplateEntity } from "./template.entity";
import { TypeInstructionMediaEntity } from "./type_instruction_media.entity";

@Entity("Reactivo_Instruccion_Media")
export class TemplateInstructionMediaEntity implements TemplateInstructionMediaI {
    @ManyToOne(() => TemplateEntity, template => template.instructionMedias)
    @JoinColumn({ name: "ID_Reactivo"})
    template_id: TemplateI;
    @ManyToOne(() => TypeInstructionMediaEntity, typeInstructionMedia => typeInstructionMedia.instructionsMedias)
    @JoinColumn({name: "ID_Tipo_Media"})
    type_media_id: TypeInstructionMediaI;
    @Column({name: "Ruta_Media", type: "varchar", length: 64, nullable: false})
    path_media: string;
}