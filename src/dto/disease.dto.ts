import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DiseaseDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  enfermedad: string;

  @ApiProperty()
  @IsNotEmpty()
  descripcion_enfermedad: string;

}
