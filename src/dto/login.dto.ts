import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

 
export class LoginDto {

    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    contrasena: string;
}