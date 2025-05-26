import { IsString, IsOptional, IsNumberString } from 'class-validator';

export class NameEvolutionDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  startDecade?: string;

  @IsOptional()
  @IsNumberString()
  endDecade?: string;
}