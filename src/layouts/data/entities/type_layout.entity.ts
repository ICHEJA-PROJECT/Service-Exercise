import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TypeLayoutI } from "src/layouts/domain/entitiesI/TypeLayoutI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LayoutEntity } from "./layout.entity";

@Entity('tipo_layouts')
export class TypeLayoutEntity implements TypeLayoutI {
    @PrimaryGeneratedColumn('increment', { name: "id_tipo_layout"})
    id: number;
    @Column({name: "nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @OneToMany(() => LayoutEntity, layout => layout.typeLayout)
    layouts: LayoutI[];
}