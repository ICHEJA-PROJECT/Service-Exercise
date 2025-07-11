import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateLayoutDto {
    @ApiProperty({description: "name of layout", type: "string", maxLength: 64})
    @IsString()
    name: string;
    @ApiProperty({description: "id of type layout", type: "number"})
    @IsNumber()
    type_layout_id: number;
}