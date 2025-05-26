import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class CompareNamesDto {
    @IsString()
    name1: string;
  
    @IsString()
    name2: string;
  }