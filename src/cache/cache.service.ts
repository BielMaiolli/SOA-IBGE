import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NameData } from './schemas/name-data.schema';

@Injectable()
export class CacheService {
  constructor(
    @InjectModel(NameData.name) private nameDataModel: Model<NameData>
  ) {}

  async get(key: string): Promise<any> {
    const cached = await this.nameDataModel.findOne({ name: key }).exec();
    return cached?.data;
  }

  async set(key: string, data: any, localidade?: string): Promise<void> {
    await this.nameDataModel.findOneAndUpdate(
      { name: key, localidade },
      { name: key, data, localidade },
      { upsert: true }
    );
  }
}