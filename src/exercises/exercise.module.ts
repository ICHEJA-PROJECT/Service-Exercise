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
import { PreferencesTransport } from 'src/shared/transports/preferences.transport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplateEntity, ExerciseEntity]),
    TopicModule,
    TemplateModule,
    ExercisesRecordTransport,
    PreferencesTransport,
  ],
  providers: [ExerciseRepositoryImpl, ExerciseService],
  controllers: [ExerciseController],
  exports: []
})
export class ExerciseModule {}
