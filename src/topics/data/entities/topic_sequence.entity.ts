
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { TopicSequenceI } from "src/topics/domain/entititesI/TopicSequenceI";

@Entity('secuencia_temas')
export class TopicSequenceEntity implements TopicSequenceI {
    @PrimaryColumn({ name: "tema", type: "int", nullable: false})
    currentTopicId: number;

    @PrimaryColumn({ name: "tema_siguiente", type: "int", nullable: false})
    nextTopicId: number;

    @ManyToMany(() => TopicEntity, topic => topic.nextTopics)
    @JoinColumn({name: "tema"})
    currentTopic: TopicI;

    @ManyToMany(() => TopicEntity, topic => topic.previousTopics)
    @JoinColumn({name: "tema_siguiente"})
    nextTopic: TopicI;

}