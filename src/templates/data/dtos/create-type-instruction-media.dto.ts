import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTypeInstructionMediaDto {
    @ApiProperty({ description: "name of type media", type: "string"})
    @IsString()
    name: string;
}