import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TypeLayoutI } from "src/layouts/domain/entitiesI/TypeLayoutI";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeLayoutEntity } from "./type_layout.entity";
import { ResourceI } from "src/topics/domain/entititesI/ResourceI";
import { ResourceEntity } from "src/topics/data/entities/resource.entity";
import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { TemplateEntity } from "src/templates/data/entities/template.entity";

@Entity('Layout')
export class LayoutEntity implements LayoutI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({name: "Nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @ManyToOne(() => TypeLayoutEntity, typelayout => typelayout.layouts)
    @JoinColumn({name: "ID_Tipo_Layout"})
    type_layout_id: TypeLayoutI;
    @OneToMany(() => ResourceEntity, resource => resource.layout)
    resources: ResourceI[];
    @OneToMany(() => TemplateEntity, template => template.layout)
    templates: TemplateI[];
}