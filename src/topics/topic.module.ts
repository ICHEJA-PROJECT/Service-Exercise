import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceEntity } from './data/entities/resource.entity';
import { LayoutEntity } from 'src/layouts/data/entities/layout.entity';
import { TopicEntity } from './data/entities/topic.entity';
import { TopicSequenceEntity } from './data/entities/topic_sequence.entity';
import { ResourceService } from './services/resource.service';
import { ResourceRepositoryImpl } from './data/repositories/resource.repository.impl';
import { TopicService } from './services/topic.service';
import { TopicController } from './controllers/topic.controller';
import { ResourceController } from './controllers/resource.controller';
import { TopicSequenceController } from './controllers/topic_sequence.controller';
import { TopicRepositoryImpl } from './data/repositories/topic.repository.impl';
import { GetAvaibleTopicsUseCase } from './domain/usecases/GetAvaibleTopicsUseCase';
import { TopicSequenceRepositoryImpl } from './data/repositories/topic_sequence.repository.impl';
import { TopicSequenceService } from './services/topic_sequence.service';
import { TopicResourceEntity } from './data/entities/topic_resource.entity';
import { TopicResourceRepositoryImpl } from './data/repositories/topic_resource.repository.impl';
import { TopicResourceService } from './services/topic_resource.service';
import { TopicResourceController } from './controllers/topic_resource.controller';
import { ExercisesRecordTransport } from 'src/shared/transports/exercises-record.transport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResourceEntity,
      LayoutEntity,
      TopicEntity,
      TopicSequenceEntity,
      TopicResourceEntity,
    ]),
    ExercisesRecordTransport,
  ],
  providers: [
    TopicSequenceRepositoryImpl,
    TopicRepositoryImpl,
    GetAvaibleTopicsUseCase,
    TopicService,
    ResourceRepositoryImpl,
    TopicResourceRepositoryImpl,
    ResourceService,
    TopicSequenceService,
    TopicResourceService,
  ],
  controllers: [
    TopicController,
    ResourceController,
    TopicSequenceController,
    TopicResourceController,
  ],
  exports: [TopicService],
})
export class TopicModule {}
