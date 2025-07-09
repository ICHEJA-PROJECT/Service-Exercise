import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { UnitI } from "src/topics/domain/entititesI/UnitI";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "./unit.entity";
import { ResourceEntity } from "./resource.entity";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";

@Entity('Tema')
export class TopicEntity implements TopicI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @ManyToOne(
        () => UnitEntity,
        unit => unit.topics
    )
    @JoinColumn({ name: "ID_unidad" })
    unit_id: UnitI;
    @ManyToMany(
        () => ResourceEntity, 
        resource => resource.topics
    )
    @JoinTable({
        name: "Tema_Recursos",
        joinColumn: { name: 'ID_Tema'},
        inverseJoinColumn: { name: 'ID_Recurso'}
    })
    resources: ResourceI[];
    @OneToMany(() => TemplateEntity, template => template.topic_id)
    templates: TemplateI[];
}