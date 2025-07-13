import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { TopicResourceI } from "src/topics/domain/entititesI/TopicResourceI";
import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { ResourceEntity } from "./resource.entity";

@Entity('tema_recursos')
export class TopicResourceEntity implements TopicResourceI {
    @PrimaryColumn({name: "id_tema", type: "int", nullable: false})
    topicId: number;
    @PrimaryColumn({name: "id_recurso", type: "int", nullable: false})
    resourceId: number;
    @ManyToOne(() => TopicEntity, topic => topic.resources)
    @JoinColumn({name: 'id_tema'})
    topic: TopicI;
    @ManyToMany(() => ResourceEntity, resource => resource.topics)
    @JoinColumn({name: 'id_recurso'})
    resource: ResourceI;
}