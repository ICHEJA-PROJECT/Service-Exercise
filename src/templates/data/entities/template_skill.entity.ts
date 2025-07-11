import { SkillI } from "src/templates/domain/entitiesI/SkillI";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { TemplateEntity } from "./template.entity";
import { SkillEntity } from "./skill.entity";

@Entity('reactivo_habilidades')
export class TemplateSkillEntity implements TemplateSkillI {
    @PrimaryColumn({ name: "id_reactivo", type: "number", nullable: false})
    templateId: number;
    @PrimaryColumn({ name: "id_habilidad", type: "number", nullable: false})
    skillId: number;
    @ManyToOne(() => TemplateEntity, template => template.skills)
    @JoinColumn({name: "id_reactivo"})
    template: TemplateI;
    @ManyToOne(() => SkillEntity, skill => skill.id)
    @JoinColumn({name: "id_habilidad"})
    skill: SkillI;
    @Column({name: "porcentaje", type: "float"})
    porcentage: number;
    @Column({ name: "bandera", type: "boolean"})
    flag: boolean;
}