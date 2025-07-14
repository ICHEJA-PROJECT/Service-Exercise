import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TopicEntity } from "src/topics/data/entities/topic.entity";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TemplateInstructionMediaEntity } from "./template_instruction_media.entity";
import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { ExerciseEntity } from "src/exercises/data/entities/exercise.entity";
import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { TemplateSkillEntity } from "./template_skill.entity";

@Entity('reactivo')
export class TemplateEntity implements TemplateI {
    @PrimaryGeneratedColumn('increment', {name: "id_reactivo"})
    id: number;
    @Column({ name: "titulo", type: "varchar", length: 64, nullable: false })
    title: string;
    @Column({ name: "instrucciones", type: "text", nullable: false })
    instructions: string;
    @Column({ name: "tiempo_sugerido", type: "time without time zone", nullable: false})
    suggestTime: string;
    @Column({ name: "atributos", type: "json" , nullable: false})
    attributes: object;
    @ManyToOne(() => TopicEntity, topic => topic.templates)
    @JoinColumn({ name: "id_tema"})
    topic: TopicI;
    @ManyToOne(() => LayoutEntity, layout => layout.templates)
    @JoinColumn({ name: "id_layout"})
    layout: LayoutI;
    @OneToMany(() => ExerciseEntity, exercise => exercise.template)
    exercises: ExerciseI[];
    @OneToMany(() => TemplateInstructionMediaEntity, templateInstrucionMedia => templateInstrucionMedia.template)
    instructionMedias: TemplateInstructionMediaI[];
    @OneToMany(() => TemplateSkillEntity, templateSkill => templateSkill.template)
    skills: TemplateSkillI[];
}