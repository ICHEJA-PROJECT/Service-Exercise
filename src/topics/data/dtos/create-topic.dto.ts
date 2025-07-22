import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTopicDto {
    @ApiProperty({ description: 'Name of topic'})
    @IsString()
    name: string;
}