import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { TemplateInstructionMediaService } from "../services/template_instruction_media.service";
import { CreateTemplateInstructionMediaDto } from "../data/dtos/create-template-instruction-media.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller('templates-instructions-medias')
export class TemplateInstructionMediaController {
    constructor(private readonly templateInstructionMediaService: TemplateInstructionMediaService) {}

    @Post()
    @UseInterceptors(FileInterceptor('pathMedia'))  
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                template: { 
                    type: 'number',
                    description: 'ID of template'
                },
                typeMedia: { 
                    type: 'number',
                    description: 'ID of type media'
                },
                pathMedia: {
                    type: 'string',
                    format: 'binary',
                    description: 'Media file (gif, img, video, etc)'
                }
            },
            required: ['template', 'typeMedia', 'pathMedia']
        }
    })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: { template: number; typeMedia: number;}, @UploadedFile() pathMedia: Express.Multer.File) {

        const createDto: CreateTemplateInstructionMediaDto = {
            pathMedia: pathMedia,
            template: body.template,
            typeMedia: body.typeMedia
        }

        return await this.templateInstructionMediaService.create(createDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.templateInstructionMediaService.findAll();
    }
}