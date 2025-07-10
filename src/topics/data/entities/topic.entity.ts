import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { UnitI } from "src/topics/domain/entititesI/UnitI";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UnitEntity } from "./unit.entity";
import { ResourceEntity } from "./resource.entity";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { TopicSequenceEntity } from "./topic_sequence.entity";

@Entity('tema')
export class TopicEntity implements TopicI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @ManyToOne(
        () => UnitEntity,
        unit => unit.topics
    )
    @JoinColumn({ name: "id_unidad" })
    unit: UnitI;
    @ManyToMany(
        () => ResourceEntity, 
        resource => resource.topics
    )
    @JoinTable({
        name: "tema_recursos",
        joinColumn: { name: 'id_tema'},
        inverseJoinColumn: { name: 'id_recurso'}
    })
    resources: ResourceI[];
    @OneToMany(() => TemplateEntity, template => template.topic_id)
    templates: TemplateI[];
    @OneToMany(() => TopicSequenceEntity, topicSequence => topicSequence.currentTopic)
    nextTopics: TopicI[];
    @OneToMany(() => TopicSequenceEntity, topicSequence => topicSequence.nextTopic)
    previousTopics: TopicI[];
}