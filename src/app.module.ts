import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'Nanami04',
    username: 'postgres',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    database: 'aprendia',
    synchronize: true,
    logging: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
