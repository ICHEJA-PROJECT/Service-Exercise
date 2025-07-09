import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("Ejercicio")
export class ExerciseEntity implements ExerciseI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Contexto", nullable: false})
    context: any;
    @ManyToOne(() => TemplateEntity, template => template.exercises)
    @JoinColumn({ name: "ID_Reactivo"})
    template_id: number;
}