import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTypeLayoutDto {
    @ApiProperty({ description: "name of type layout (Resource, Template)", type: "string"})
    @IsString()
    name: string;
}