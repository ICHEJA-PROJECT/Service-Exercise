
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { TopicSequenceI } from "src/topics/domain/entititesI/TopicSequenceI";

@Entity('secuencia_temas')
export class TopicSequenceEntity implements TopicSequenceI {
    @PrimaryColumn({ name: "tema", type: "number", nullable: false})
    currentTopicId: number;

    @PrimaryColumn({ name: "tema_siguiente", type: "number", nullable: false})
    nextTopicId: number;

    @ManyToMany(() => TopicEntity, topic => topic.nextTopics)
    currentTopic: TopicI;

    @ManyToMany(() => TopicEntity, topic => topic.previousTopics)
    nextTopic: TopicI;

}