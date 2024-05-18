import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

 
export class ResponseDto {

    @ApiProperty()
    @IsNotEmpty()
    response: boolean;

    @ApiProperty()
    @IsNotEmpty()
    data: any;

    @ApiProperty()
    @IsNotEmpty()
    message: any;
}