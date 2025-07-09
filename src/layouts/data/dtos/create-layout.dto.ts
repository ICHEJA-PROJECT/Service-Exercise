import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateLayoutDto {
    @ApiProperty({type: "string", maxLength: 64})
    @IsString()
    name: string;
    @ApiProperty({type: "number"})
    @IsNumber()
    type_layout_id: number;
}