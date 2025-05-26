import { Controller, Get, Query, Render } from '@nestjs/common';
import { NamesService } from './names.service';
import { NameEvolutionDto } from './dto/name-evolution.dto';
import { LocationNamesDto } from './dto/location-names.dto';
import { CompareNamesDto } from './dto/compare-names.dto';


@Controller()
export class NamesController {
  constructor(private namesService: NamesService) {}

  @Get()
  root() {
    return { message: 'Sistema SOA de Análise de Nomes - API funcionando!' };
  }

  @Get('api/name-evolution')
  async getNameEvolution(@Query() query: NameEvolutionDto) {
    return await this.namesService.getNameEvolution(
      query.name,
      query.startDecade,
      query.endDecade
    );
  }

  @Get('api/location-names')
  async getLocationNames(@Query() query: LocationNamesDto) {
    return await this.namesService.getLocationTopNames(query.localidade);
  }

  @Get('api/compare-names')
  async compareNames(@Query() query: CompareNamesDto) {
    return await this.namesService.compareNames(query.name1, query.name2);
  }
}