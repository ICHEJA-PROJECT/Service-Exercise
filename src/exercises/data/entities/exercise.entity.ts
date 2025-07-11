import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("ejercicio")
export class ExerciseEntity implements ExerciseI {
    @PrimaryGeneratedColumn('increment', {name: "id_ejercicio"})
    id: number;
    @Column({ name: "contexto", nullable: false, type: "json"})
    context: object;
    @ManyToOne(() => TemplateEntity, template => template.exercises)
    @JoinColumn({ name: "id_reactivo"})
    template: TemplateI;
}