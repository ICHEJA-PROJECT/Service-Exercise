import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";

@Entity('Recurso')
export class ResourceEntity implements ResourceI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Contenido", nullable: false})
    content: Object;
    @ManyToMany(() => TopicEntity, topic => topic.resources)
    topics: TopicI[];
    @ManyToOne(() => LayoutEntity, layout => layout.resources)
    @JoinColumn({name: "ID_Layout"})
    layout: LayoutI;
}