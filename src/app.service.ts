import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
@Injectable()
export class AppService {

  dbProvider: any;

  getHello(): string {
    return 'Hello World!';
  }

  buildConection() {
    this.dbProvider = {
      provide: 'pgConnection',
      useValue: new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'admin',
        port: '5432'
      })
    };
  }

  async addPatient() {
    try {
      this.buildConection();
      const query = `INSERT INTO public.paciente(id, nombre, apellido, fecha_nacimiento, direccion, barrio, telefono)
     VALUES ('1053823284','Sergio', 'Moreno', '2023-12-17', 'Calle 13#25-17', 'el Bosque', '3147588939');`;
      await this.dbProvider.useValue.query(query);
      return 'El paciente ha sido creado';
    } catch (error) {
      return 'Error agregando el paciente';
    }

  }

  async deletePatient() {
    try {
      this.buildConection();
      const query = `DELETE FROM public.paciente WHERE id = '1053823284'`;
      await this.dbProvider.useValue.query(query);
      return 'El paciente ha sido eliminado';
    } catch (error) {
      return 'Error eliminando el paciente';
    }

  }

  async updatePatient() {
    try {
      this.buildConection();
      const query = `UPDATE public.paciente SET direccion = 'M9 C72', barrio = 'La Linda', telefono = '3147588939'
              WHERE id = '1053823284';`;
      await this.dbProvider.useValue.query(query);
      return 'El paciente se ha actualizado';
    } catch (error) {
      return 'Error actualizando el paciente';
    }

  }

  async getPatient() {
    try {
      this.buildConection();
      const query = `SELECT * FROM public.paciente WHERE id = '1053823284'`;
      let result = await this.dbProvider.useValue.query(query);

      let row = result.rows[0];
      return `El usuario es ${row['nombre']}, con apellido ${row['apellido']}`;
    } catch (error) {
      return 'Error consultando el usuario';
    }

  }


}
