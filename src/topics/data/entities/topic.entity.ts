import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ResourceEntity } from "./resource.entity";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";
import { TopicSequenceEntity } from "./topic_sequence.entity";

@Entity('tema')
export class TopicEntity implements TopicI {
    @PrimaryGeneratedColumn('increment', { name: "id_tema"})
    id: number;
    @Column({ name: "nombre", type: "varchar", length: 64, nullable: false})
    name: string;
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
    @OneToMany(() => TemplateEntity, template => template.topic)
    templates: TemplateI[];
    @OneToMany(() => TopicSequenceEntity, topicSequence => topicSequence.currentTopic)
    nextTopics: TopicI[];
    @OneToMany(() => TopicSequenceEntity, topicSequence => topicSequence.nextTopic)
    previousTopics: TopicI[];
}