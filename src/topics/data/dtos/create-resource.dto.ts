import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateResourceDto {
    @ApiProperty({ description: "Name of the resource", type: "string"})
    @IsString()
    title: string;
    @ApiProperty({ description: 'Object which contain teorical materia'})
    @IsObject()
    content: Object;
    @ApiProperty({ type: "number", description: 'Id of layout'})
    @IsNumber()
    layout_id: number;
}