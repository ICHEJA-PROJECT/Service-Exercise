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

@Entity('Reactivo')
export class TemplateEntity implements TemplateI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Titulo", type: "varchar", length: 64, nullable: false })
    title: string;
    @Column({ name: "Subtitulo", type: "text", nullable: false })
    instructions: string;
    @Column({ name: "Tiempo_Sugerido", type: "varchar", nullable: false})
    suggest_time: string;
    @Column({ name: "Atributos", type: "json" , nullable: false})
    attributes: object;
    @ManyToOne(() => TopicEntity, topic => topic.templates)
    @JoinColumn({ name: "ID_Tema"})
    topic_id: TopicI;
    @ManyToOne(() => LayoutEntity, layout => layout.templates)
    @JoinColumn({ name: "ID_Layout"})
    layout: LayoutI;
    @OneToMany(() => ExerciseEntity, exercise => exercise.template_id)
    exercises: ExerciseI[];
    @OneToMany(() => TemplateInstructionMediaEntity, templateInstrucionMedia => templateInstrucionMedia.template_id)
    instructionMedias: TemplateInstructionMediaI[];
}