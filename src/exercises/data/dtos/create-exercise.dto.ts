import { ApiProperty } from "@nestjs/swagger";
import { IsObject } from "class-validator";

export class CreateExerciseDto {
    @ApiProperty({ description: "context is all material of template", type: "object", additionalProperties: false})
    @IsObject()
    context: object;
    @ApiProperty({ description: "id of template", type: "number"})
    template: number;
}