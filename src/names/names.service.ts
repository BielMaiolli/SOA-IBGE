import { Injectable } from '@nestjs/common';
import { IbgeService } from '../ibge/ibge.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class NamesService {
  constructor(
    private ibgeService: IbgeService,
    private cacheService: CacheService,
  ) {}

  async getNameEvolution(name: string, startDecade?: string, endDecade?: string) {
    const cacheKey = `evolution_${name}_${startDecade}_${endDecade}`;
    let data = await this.cacheService.get(cacheKey);

    if (!data) {
      data = await this.ibgeService.getNameEvolution(name);
      await this.cacheService.set(cacheKey, data);
    }

    return this.filterByDecades(data, startDecade, endDecade);
  }

  async getLocationTopNames(localidade: string) {
    const cacheKey = `location_${localidade}`;
    let data = await this.cacheService.get(cacheKey);

    if (!data) {
      data = await this.ibgeService.getTopNamesInLocation(localidade);
      await this.cacheService.set(cacheKey, data, localidade);
    }

    return this.getTop3Names(data);
  }

  async compareNames(name1: string, name2: string) {
    const [data1, data2] = await Promise.all([
      this.getNameEvolution(name1),
      this.getNameEvolution(name2)
    ]);

    return {
      name1: { name: name1, data: data1 },
      name2: { name: name2, data: data2 }
    };
  }

  private filterByDecades(data: any, startDecade?: string, endDecade?: string) {
    if (!startDecade && !endDecade) return data;

    const start = startDecade ? parseInt(startDecade) : 1930;
    const end = endDecade ? parseInt(endDecade) : 2010;

    if (data && data[0] && data[0].res) {
      data[0].res = data[0].res.filter(item => 
        item.periodo >= start && item.periodo <= end
      );
    }

    return data;
  }

  private getTop3Names(data: any) {
    if (!data || !data[0] || !data[0].res) return [];
    
    return data[0].res
      .sort((a, b) => b.frequencia - a.frequencia)
      .slice(0, 3);
  }
}