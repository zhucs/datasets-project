import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatasetsModule } from './datasets/datasets.module';

@Module({
  imports: [DatasetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
