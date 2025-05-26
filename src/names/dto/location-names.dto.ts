import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class LocationNamesDto {
    @IsString()
    localidade: string;
  }