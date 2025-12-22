import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  company: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsEnum(['applied', 'interview', 'offer', 'rejected'])
  status?: 'applied' | 'interview' | 'offer' | 'rejected';

  @IsOptional()
  @IsUrl()
  link?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

