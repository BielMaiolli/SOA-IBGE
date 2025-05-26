import { Module } from '@nestjs/common';
import { NamesController } from './names.controller';
import { NamesService } from './names.service';
import { IbgeModule } from '../ibge/ibge.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [IbgeModule, CacheModule],
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}