import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

 
export class PatientDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    apellido: string;

    @ApiProperty()
    @IsNotEmpty()
    fecha_nacimiento: string;

    @ApiProperty()
    @IsNotEmpty()
    direccion: string;

    @ApiProperty()
    @IsNotEmpty()
    barrio: string;

    @ApiProperty()
    @IsNotEmpty()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    contrasena: string;
}