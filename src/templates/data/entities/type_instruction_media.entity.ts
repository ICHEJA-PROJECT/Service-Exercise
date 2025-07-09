import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { TypeInstructionMediaI } from "src/templates/domain/entitiesI/TypeInstructionMediaI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateInstructionMediaEntity } from "./template_instruction_media.entity";

@Entity("Tipo_Instruccion_Media")
export class TypeInstructionMediaEntity implements TypeInstructionMediaI{
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Nombre", type: "varchar", length: 32, nullable: false})
    name: string;
    @OneToMany(() => TemplateInstructionMediaEntity, templateInstructionMedia => templateInstructionMedia.type_media_id)
    instructionsMedias: TemplateInstructionMediaI[];
}