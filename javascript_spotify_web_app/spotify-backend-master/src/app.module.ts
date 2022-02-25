import { Module } from '@nestjs/common';
import { SongsModule } from './api/v1/Songs/songs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SongsModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
