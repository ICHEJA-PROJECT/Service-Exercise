import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLearningPathDto {
    @ApiProperty({description: 'name of learning path', type: 'string', maxLength: 64})
    @IsString()
    name: string;
}