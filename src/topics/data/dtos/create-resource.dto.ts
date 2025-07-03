import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class CreateResourceDto {
    @ApiProperty({ description: 'Object which contain teorical materia'})
    @IsObject()
    content: Object;
}