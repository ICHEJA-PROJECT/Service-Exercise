import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateTopicDto } from "../data/dtos/create-topic.dto";
import { TopicRepository } from "../domain/repositories/TopicRepository";
import { Topic } from "../domain/entities/Topic";
import { TopicI } from "../domain/entititesI/TopicI";
import { GetAvaibleTopicsUseCase } from "../domain/usecases/GetAvaibleTopicsUseCase";
import { TopicRepositoryImpl } from "../data/repositories/topic.repository.impl";

@Injectable()
export class TopicService {
    constructor(
        @Inject(TopicRepositoryImpl) private readonly _topicRepository: TopicRepository, 
        private readonly getAvaibleTopicsUseCase: GetAvaibleTopicsUseCase) {}

    async create(topic: CreateTopicDto): Promise<TopicI> {
        try {
            const topicReq = new Topic(topic.name, topic.unit_id);
            const topicSaved = await this._topicRepository.create(topicReq)
            return topicSaved;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: number): Promise<TopicI> {
        try {
            const topic = await this._topicRepository.findOne(id);
            return topic;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByPupil(idPupil: number): Promise<TopicI[]> {
        try {
            
            // Consultar al servicio que contiene la tabla Educando-Temas para obtener los ids de los temas que ya ha completado.
            const completedTopics = [1, 2];

            // Aquí implementar lógica de grafo dirigido para encontrar temas permitidos.
            const idTopics = await this.getAvaibleTopicsUseCase.run(completedTopics);

            const avaibleTopics = await this._topicRepository.findByIds(idTopics);

            // Devolver los temas a los que tiene acceso el educando.
            return avaibleTopics;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<TopicI[]> {
        try {
            const topics = await this._topicRepository.findAll();
            return topics;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}