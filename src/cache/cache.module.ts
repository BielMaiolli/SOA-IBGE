import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from './cache.service';
import { NameData, NameDataSchema } from './schemas/name-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NameData.name, schema: NameDataSchema }
    ])
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}