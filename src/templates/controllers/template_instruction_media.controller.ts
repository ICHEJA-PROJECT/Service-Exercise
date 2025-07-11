import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TemplateInstructionMediaService } from "../services/template_instruction_media.service";
import { CreateTemplateInstructionMediaDto } from "../data/dtos/create-template-instruction-media.dto";

@Controller('templates/instructions/medias')
export class TemplateInstructionMediaController {
    constructor(private readonly templateInstructionMediaService: TemplateInstructionMediaService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTemplateInstrcutionMediaDto: CreateTemplateInstructionMediaDto) {
        return await this.templateInstructionMediaService.create(createTemplateInstrcutionMediaDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.templateInstructionMediaService.findAll();
    }
}