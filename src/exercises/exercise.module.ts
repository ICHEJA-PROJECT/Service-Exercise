import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './data/entities/exercise.entity';
import { TemplateEntity } from 'src/templates/data/entities/template.entity';
import { ExerciseController } from './controller/exercise.controller';
import { ExerciseRepositoryImpl } from './data/repositories/exercise.repository.impl';
import { ExerciseService } from './services/exercise.service';
import { TopicModule } from 'src/topics/topic.module';
import { TemplateModule } from 'src/templates/template.module';
import { ExercisesRecordTransport } from 'src/shared/transports/exercises-record.transport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity, ExerciseEntity]),
    TopicModule,
    TemplateModule,
    ExercisesRecordTransport,
  ],
  providers: [ExerciseRepositoryImpl, ExerciseService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
