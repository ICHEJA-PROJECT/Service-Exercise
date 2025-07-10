import { SkillI } from "src/templates/domain/entitiesI/SkillI";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { TemplateEntity } from "./template.entity";
import { SkillEntity } from "./skill.entity";

@Entity('reactivo_habilidades')
export class TemplateSkillEntity implements TemplateSkillI {
    @ManyToOne(() => TemplateEntity, template => template.skills)
    @JoinColumn({name: "id_reactivo"})
    template: TemplateI;
    @ManyToOne(() => SkillEntity, skill => skill.id)
    @JoinColumn({name: "id_habilidad"})
    skill: SkillI;
    @Column({name: "porcentaje", type: "number"})
    porcentage: number;
}