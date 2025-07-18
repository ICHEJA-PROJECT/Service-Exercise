import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TemplateInstructionMediaRepositoryImpl } from '../data/repositories/template_instruction_media.repository.impl';
import { TemplateInstructionMediaRepository } from '../domain/repositories/TemplateInstructionMediaRepository';
import { CreateTemplateInstructionMediaDto } from '../data/dtos/create-template-instruction-media.dto';
import { TemplateInstructionMedia } from '../domain/entities/TemplateInstructionMedia';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';
import { RpcException } from '@nestjs/microservices';
import * as moment from 'moment';

@Injectable()
export class TemplateInstructionMediaService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(TemplateInstructionMediaRepositoryImpl)
    private readonly templateInstructionMediaRepository: TemplateInstructionMediaRepository,
  ) {}

  async create(
    createTemplateInstructionMediaDto: CreateTemplateInstructionMediaDto,
  ) {
    try {
      const formData = new FormData();
      const fileName = `${createTemplateInstructionMediaDto.template}-I-${moment().format('YYYY-MM-DD-HH-mm-ss')}`;

      formData.append(
        'file',
        createTemplateInstructionMediaDto.pathMedia.buffer,
        {
          filename: createTemplateInstructionMediaDto.pathMedia.originalname,
          contentType: createTemplateInstructionMediaDto.pathMedia.mimetype,
        },
      );
      formData.append('fileName', fileName);
      formData.append('folder', 'instruction-medias');

      const uploadResponse = await firstValueFrom(
        this.httpService
          .post('/api/cloudinary/upload', formData, {
            headers: {
              ...formData.getHeaders(),
            },
          })
          .pipe(
            catchError((error) => {
              throw new RpcException(error);
            }),
          ),
      );
      const pathFile = uploadResponse.data.data.url;

      const templateInstructionMedia = new TemplateInstructionMedia(
        pathFile,
        createTemplateInstructionMediaDto.template,
        createTemplateInstructionMediaDto.typeMedia,
      );
      const templateInstructionMediaSaved =
        await this.templateInstructionMediaRepository.create(
          templateInstructionMedia,
        );
      return templateInstructionMediaSaved;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const templateInstructionMedias =
        await this.templateInstructionMediaRepository.findAll();
      return templateInstructionMedias;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
