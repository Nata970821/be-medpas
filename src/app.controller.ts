import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('addpatient')
  addPatient() {
    return this.appService.addPatient();
  }

  @Delete('deletepatient')
  deletePatient() {
    return this.appService.deletePatient(); 
  }

  @Patch('updatepatient')
  updatePatient() {
    return this.appService.updatePatient();
  }

  @Get('getpatient')
  getPatient() {
    return this.appService.getPatient();
  }
}
