import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IbgeService {
  private readonly baseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

  async getNameEvolution(name: string, localidade?: string): Promise<any> {
    try {
      let url = `${this.baseUrl}/${encodeURIComponent(name)}`;
      if (localidade) {
        url += `?localidade=${localidade}`;
      }
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao consultar API do IBGE',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }

  async getTopNamesInLocation(localidade: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/ranking?localidade=${localidade}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao consultar ranking da localidade',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
}