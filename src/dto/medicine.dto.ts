import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MedicineDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  nombre_medicamento: string;

  @ApiProperty()
  @IsNotEmpty()
  fecha_prescripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  dosis: string;

  @ApiProperty()
  @IsNotEmpty()
  instrucciones_uso: string;
}
