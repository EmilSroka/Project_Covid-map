import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ApiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'covid'),
    }),
  ],
})
export class AppModule {}
