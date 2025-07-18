import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTopicDto } from '../data/dtos/create-topic.dto';
import { TopicRepository } from '../domain/repositories/TopicRepository';
import { Topic } from '../domain/entities/Topic';
import { TopicI } from '../domain/entititesI/TopicI';
import { GetAvaibleTopicsUseCase } from '../domain/usecases/GetAvaibleTopicsUseCase';
import { TopicRepositoryImpl } from '../data/repositories/topic.repository.impl';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RECORD_SERVICE_OPTIONS } from 'src/shared/constants/record_service_options';

@Injectable()
export class TopicService {
  constructor(
    @Inject(TopicRepositoryImpl)
    private readonly _topicRepository: TopicRepository,
    private readonly getAvaibleTopicsUseCase: GetAvaibleTopicsUseCase,
    @Inject(RECORD_SERVICE_OPTIONS.RECORD_SERVICE_NAME)
    private readonly client: ClientProxy,
  ) {}

  async create(topic: CreateTopicDto): Promise<TopicI> {
    try {
      const topicReq = new Topic(topic.name, topic.unit_id);
      const topicSaved = await this._topicRepository.create(topicReq);
      return topicSaved;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<TopicI> {
    try {
      const topic = await this._topicRepository.findOne(id);
      return topic;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByPupil(idPupil: number): Promise<TopicI[]> {
    try {
      // Consultar al servicio que contiene la tabla Educando-Temas para obtener los ids de los temas que ya ha completado.
      const pupilTopicsResponse = await firstValueFrom(
        this.client
          .send(
            { cmd: RECORD_SERVICE_OPTIONS.PUPIL_TOPIC_FIND_BY_PUPIL },
            idPupil,
          )
          .pipe(
            catchError((error) => {
              console.error('Error en la petición:', error);
              throw new RpcException({
                message: error.message || 'Error en la petición HTTP',
                code: error.code || 'HTTP_ERROR',
                details: error.response?.data || error,
              });
            }),
          ),
      );

      const completedTopics = pupilTopicsResponse.data;

      // Aquí implementar lógica de grafo dirigido para encontrar temas permitidos.
      const idTopics = await this.getAvaibleTopicsUseCase.run(completedTopics);

      const avaibleTopics = await this._topicRepository.findByIds(idTopics);

      // Devolver los temas a los que tiene acceso el educando.
      return avaibleTopics;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<TopicI[]> {
    try {
      const topics = await this._topicRepository.findAll();
      return topics;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
