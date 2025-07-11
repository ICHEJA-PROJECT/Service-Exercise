import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from './topics/topic.module';
import { LayoutModule } from './layouts/layout.module';
import { TemplateModule } from './templates/template.module';
import { ExerciseModule } from './exercises/exercise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'Nanami04',
      username: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: 'aprendia',
      synchronize: true,
      logging: true
    }),
    TopicModule,
    LayoutModule,
    TemplateModule,
    ExerciseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
