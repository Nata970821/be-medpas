import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PatientDto } from './dto/patient.dto';
import { LoginDto } from './dto/login.dto';
import { MedicineDto } from './dto/medicine.dto';
import { DiseaseDto } from './dto/disease.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Este metodo sirve para agregar un paciente
   * @param dto informacion del paciente
   * @returns
   */
  @Post('addpatient')
  addPatient(@Body() dto: PatientDto) {
    return this.appService.addPatient(dto);
  }
  /**
   * Sirve para eliminar un paciente
   * @param id Informacion del paciente
   * @returns
   */
  @Delete('deletepatient/:id')
  deletePatient(@Param('id') id) {
    console.log(id);
    return this.appService.deletePatient(id);
  }

  /**
   * Sirve para editar uno o dos campos
   * @param data Informacion del paciente
   * @returns
   */
  @Patch('updatepatient')
  updatePatient(@Body() data: PatientDto) {
    return this.appService.updatePatient(data);
  }

  /**
   * Sirve para abtener informacion del paciente
   * @param id
   * @returns
   */
  @Get('getpatient/:id')
  getPatient(@Param('id') id) {
    console.log(id);
    return this.appService.getPatient(id);
  }

  /**
   * Sirve para agregar datos nuevos del paciente
   * @param dto Información del paciente
   * @returns
   */
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }

  /**
   * Este metodo sirve para agregar un medicamento
   * @param dto informacion del medicamento
   * @returns
   */
  @Post('addmedicine')
  addMedicine(@Body() dto: MedicineDto) {
    return this.appService.addMedicine(dto);
  }
  /**
   * Sirve para eliminar un medicamento
   * @param id Informacion del medicamento
   * @returns
   */
  @Delete('deletemedicine/:id')
  deleteMedicine(@Param('id') id) {
    console.log(id);
    return this.appService.deleteMedicine(id);
  }

  /**
   * Sirve para editar uno o dos campos
   * @param data Informacion del medicamento
   * @returns
   */
  @Patch('updatemedicine')
  updateMedicine(@Body() data: MedicineDto) {
    return this.appService.updateMedicine(data);
  }

  /**
   * Sirve para abtener informacion del medicamento
   * @param id
   * @returns
   */
  @Get('getmedicine/:id')
  getMedicine(@Param('id') id) {
    console.log(id);
    return this.appService.getMedicine(id);
  }

  /**
   * Este metodo sirve para agregar una enfermedad del paciente
   * @param dto informacion de la enfermedad
   * @returns
   */
  @Post('adddisease')
  adddisease(@Body() dto: DiseaseDto) {
    return this.appService.addDisease(dto);
  }
  /**
   * Sirve para eliminar una enfermedad
   * @param id Informacion de la enfermedad
   * @returns
   */
  @Delete('deletedisease/:id')
  deleteDisease(@Param('id') id) {
    console.log(id);
    return this.appService.deleteDisease(id);
  }

  /**
   * Sirve para editar uno o dos campos
   * @param data Informacion de la enfermedad
   * @returns
   */
  @Patch('updatedisease')
  updateDisease(@Body() data: DiseaseDto) {
    return this.appService.updateDisease(data);
  }

  /**
   * Sirve para abtener informacion de la enfermedad
   * @param id
   * @returns
   */
  @Get('getdisease/:id')
  getDisease(@Param('id') id) {
    console.log(id);
    return this.appService.getDisease(id);
  }
}
