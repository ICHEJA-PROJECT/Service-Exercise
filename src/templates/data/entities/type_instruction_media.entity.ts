import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { TypeInstructionMediaI } from "src/templates/domain/entitiesI/TypeInstructionMediaI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateInstructionMediaEntity } from "./template_instruction_media.entity";

@Entity("tipo_instruccion_media")
export class TypeInstructionMediaEntity implements TypeInstructionMediaI{
    @PrimaryGeneratedColumn('increment', {name: "id_tipo_media"})
    id: number;
    @Column({ name: "nombre", type: "varchar", length: 32, nullable: false})
    name: string;
    @OneToMany(() => TemplateInstructionMediaEntity, templateInstructionMedia => templateInstructionMedia.typeMedia)
    instructionsMedias: TemplateInstructionMediaI[];
}