import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { LayoutEntity } from "src/layouts/data/entities/layout.entity";

@Entity('recurso')
export class ResourceEntity implements ResourceI {
    @PrimaryGeneratedColumn('increment', { name: "id_recurso"})
    id: number;
    @Column({name: "titulo", type: "varchar", length: 64, nullable: false})
    title: string;
    @Column({ name: "contenido", type: "jsonb", nullable: false})
    content: object;
    @ManyToMany(() => TopicEntity, topic => topic.resources)
    topics: TopicI[];
    @ManyToOne(() => LayoutEntity, layout => layout.resources)
    @JoinColumn({name: "id_Layout"})
    layout: LayoutI;
}