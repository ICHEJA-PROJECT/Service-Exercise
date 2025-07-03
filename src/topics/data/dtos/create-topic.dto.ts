import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTopicDto {
    @ApiProperty({ description: 'Name of topic'})
    @IsString()
    name: string;
    @ApiProperty({ description: 'id of unit who belong'})
    @IsNumber()
    unit_id: number;
}