import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class GetSkillsByTemplatesDto {
    @ApiProperty({ description: "Array with template ids", type: [Number]})
    @IsArray()
    templateIds: number[];
}