import { SkillI } from "src/templates/domain/entitiesI/SkillI";
import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateSkillEntity } from "./template_skill.entity";

@Entity('habilidad')
export class SkillEntity implements SkillI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({name: "nombre", type: "varchar", length: 64, nullable: false })
    name: string;
    @OneToMany(() => TemplateSkillEntity, templateSkill => templateSkill.skill)
    templates: TemplateSkillI[];
}