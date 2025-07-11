import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSkillDto {
    @ApiProperty({ description: "name of skill", type: "string"})
    @IsString()
    name: string;
}