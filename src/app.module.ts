import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NamesModule } from './names/names.module';
import { IbgeModule } from './ibge/ibge.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nome-trends'),
    NamesModule,
    IbgeModule,
    CacheModule,
  ],
})
export class AppModule {}