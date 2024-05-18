import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PatientDto } from './dto/patient.dto';
import { ResponseDto } from './dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { MedicineDto } from './dto/medicine.dto';
import { DiseaseDto } from './dto/disease.dto';

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
        port: '5432',
      }),
    };
  }

  /**
   * Sirve para crear un paciente
   * @param dto Información del paciente
   * @returns 
   */
  async addPatient(dto: PatientDto) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `INSERT INTO public.paciente(id, nombre, apellido, fecha_nacimiento, direccion, barrio, telefono, contrasena)
     VALUES ('${dto.id}','${dto.nombre}', '${dto.apellido}', '${dto.fecha_nacimiento}', '${dto.direccion}', '${dto.barrio}', '${dto.telefono}', '${dto.contrasena}');`;
      await this.dbProvider.useValue.query(query);

      responseDto.response = true;
      responseDto.message = 'El paciente ha sido creado';
      return responseDto;
    } catch (error) {
      responseDto.message = 'Error creando el paciente';
      return responseDto;
    }
  }

  /**
   * Sirve para eliminar un paciente
   * @param id Información del paciente
   * @returns 
   */
  async deletePatient(id: string) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `DELETE FROM public.paciente WHERE id = '${id}'`;
      await this.dbProvider.useValue.query(query);

      responseDto.response = true;
      responseDto.message = 'El paciente ha sido eliminado';
      return responseDto;
    } catch (error) {
      responseDto.message = 'Error eliminando el paciente';
      return responseDto;
    }
  }

  /**
   * Sirve para actualizar los datos del paciente
   * @param data Información del paciente
   * @returns 
   */
  async updatePatient(data: PatientDto) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `UPDATE public.paciente SET direccion = '${data.direccion}', barrio = '${data.barrio}', telefono = '${data.telefono}', contrasena = '${data.contrasena}'
              WHERE id = '${data.id}';`;
      await this.dbProvider.useValue.query(query);

      responseDto.response = true;
      responseDto.message = 'El paciente se ha actualizado';
      responseDto.data = data;
    } catch (error) {
      responseDto.message = 'Error actualizando el paciente';
      responseDto.data = data;
    }

    return responseDto;
  }
/**
 * Sirve para agregar un paciente
 * @param id 
 * @returns 
 */
  async getPatient(id: string) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };

    try {
      this.buildConection();
      const query = `SELECT * FROM public.paciente WHERE id = '${id}'`;
      let result = await this.dbProvider.useValue.query(query);

      if (result.rows.length > 0) {
        let row = result.rows[0];
        let patient: PatientDto = {
          id: row['id'],
          nombre: row['nombre'],
          apellido: row['apellido'],
          fecha_nacimiento: row['fecha_nacimiento'],
          direccion: row['direccion'],
          barrio: row['barrio'],
          telefono: row['telefono'],
          contrasena: row['contrasena'],
        };

        responseDto.response = true;
        responseDto.message = '';
        responseDto.data = patient;
      } else {
        responseDto.message = 'El usuario no ha sido encontrado';
        let patient: PatientDto;
        responseDto.data = {
          id: '',
          nombre: '',
          apellido: '',
          fecha_nacimiento: '',
          direccion: '',
          barrio: '',
          telefono: '',
          contrasena: '',
        };
      }

      return responseDto;
    } catch (error) {
      responseDto.message = 'El usuario no ha sido encontrado';
      let patient: PatientDto;
      responseDto.data = patient;
      return responseDto;
    }
  }

  /**
   * Sirve para iniciar sesión
   * @param dto 
   * @returns 
   */
  async login(dto: LoginDto) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };

    try {
      this.buildConection();
      const query = `SELECT * FROM public.paciente WHERE id = '${dto.id}' and contrasena = '${dto.contrasena}' `;
      let result = await this.dbProvider.useValue.query(query);

      if (result.rows.length > 0) {
        

        responseDto.response = true;
        responseDto.message = 'El usuario ha iniciado sesión';
      } else {
        responseDto.message = 'El usuario no esta registrado';
        
      }

      return responseDto;
    } catch (error) {
      responseDto.message = 'El usuario no esta registrado';
      return responseDto;
    }
  }

  /**
   * Sirve para crear un medicamento
   * @param dto Información del medicamento
   * @returns 
   */
  async addMedicine(dto: MedicineDto) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `INSERT INTO public.medicamento(id_paciente, id, dosis, fecha_prescripcion, instruccion_uso)
     VALUES ('${dto.id}','${dto.nombre_medicamento}', '${dto.dosis}', '${dto.fecha_prescripcion}', '${dto.instrucciones_uso}');`;
     console.log(query);  
     await this.dbProvider.useValue.query(query);
      console.log(query); 
      responseDto.response = true;
      responseDto.message = 'El medicamento ha sido agregado';
      return responseDto;
    } catch (error) {
      responseDto.message = 'Error agregando el medicamento';
      return responseDto;
    }
  }

  /**
   * Sirve para eliminar un medicamento
   * @param id Información del medicamento
   * @returns 
   */
  async deleteMedicine(id: string) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `DELETE FROM public.medicamento WHERE id = '${id}'`;
      await this.dbProvider.useValue.query(query);

      responseDto.response = true;
      responseDto.message = 'El medicamento ha sido eliminado';
      return responseDto;
    } catch (error) {
      responseDto.message = 'Error eliminando el medicamento';
      return responseDto;
    }
  }

  /**
   * Sirve para actualizar los datos del medicamento
   * @param data Información del medicamento
   * @returns 
   */
  async updateMedicine(data: MedicineDto) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };
    try {
      this.buildConection();
      const query = `UPDATE public.medicamento SET dosis = '${data.dosis}', instruccion_uso = '${data.instrucciones_uso}', fecha_prescripcion = '${data.fecha_prescripcion}'
              WHERE id_paciente = '${data.id}' and id = '${data.nombre_medicamento}';`;
              console.log(query);
      await this.dbProvider.useValue.query(query);

      responseDto.response = true;
      responseDto.message = 'El medicamento se ha actualizado';
      responseDto.data = data;
    } catch (error) {
      responseDto.message = 'Error actualizando el medicamento';
      responseDto.data = data;
    }

    return responseDto;
  }
/**
 * Sirve para agregar un medicamento
 * @param id 
 * @returns 
 */
  async getMedicine(id: string) {
    let responseDto: ResponseDto = {
      response: false,
      data: '',
      message: '',
    };

    try {
      this.buildConection();
      const query = `SELECT * FROM public.medicamento WHERE id = '${id}'`;
      let result = await this.dbProvider.useValue.query(query);

      if (result.rows.length > 0) {
        let row = result.rows[0];
        let medicine: MedicineDto = {
          id: row['id'],
          nombre_medicamento: row['nombre_medicamento'],
          dosis: row['dosis'],
          fecha_prescripcion: row['fecha_prescripcion'],
          instrucciones_uso: row['instruccion_uso'],
        };

        responseDto.response = true;
        responseDto.message = '';
        responseDto.data = medicine;
      } else {
        responseDto.message = 'El medicamento no ha sido encontrado';
        let medicine: MedicineDto;
        responseDto.data = {
          id: '',
          nombre_medicamento: '',
          dosis: '',
          fecha_prescripcion: '',
          instruccion_uso: '',
        };
      }

      return responseDto;
    } catch (error) {
      responseDto.message = 'El medicamento no ha sido encontrado';
      let medicine: MedicineDto;
      responseDto.data = medicine;
      return responseDto;
    }
  }


/**
   * Sirve para crear una enfermedad
   * @param dto Información de la enfermedad
   * @returns 
   */
async addDisease(dto: DiseaseDto) {
  let responseDto: ResponseDto = {
    response: false,
    data: '',
    message: '',
  };
  try {
    this.buildConection();
    const query = `INSERT INTO public.enfermedad(id_paciente, id, descripcion)
   VALUES ('${dto.id}','${dto.enfermedad}', '${dto.descripcion_enfermedad}');`;
   console.log(query)
    await this.dbProvider.useValue.query(query);

    responseDto.response = true;
    responseDto.message = 'La enfermedad ha sido agregado';
    return responseDto;
  } catch (error) {
    responseDto.message = 'Error agregando la enfermedad'; 
    return responseDto; 
  }
}

/**
 * Sirve para eliminar una enfermedad del paciente
 * @param id Información de la enfermedad
 * @returns 
 */
async deleteDisease(id: string) {
  let responseDto: ResponseDto = {
    response: false,
    data: '',
    message: '',
  };
  try {
    this.buildConection();
    const query = `DELETE FROM public.enermedad WHERE id = '${id}'`;
    await this.dbProvider.useValue.query(query);

    responseDto.response = true;
    responseDto.message = 'La enfermedad ha sido eliminado';
    return responseDto;
  } catch (error) {
    responseDto.message = 'Error eliminando la enfermedad';
    return responseDto;
  }
}

/**
 * Sirve para actualizar los datos de la enfermedad
 * @param data Información de la enfermedad
 * @returns 
 */
async updateDisease(data: DiseaseDto) {
  let responseDto: ResponseDto = {
    response: false,
    data: '',
    message: '',
  };
  try {
    this.buildConection();
    const query = `UPDATE public.enfermedad SET id = '${data.enfermedad}', descripcion = '${data.descripcion_enfermedad}'
            WHERE id = '${data.id}';`;
    await this.dbProvider.useValue.query(query);

    responseDto.response = true;
    responseDto.message = 'La enfermedad se ha actualizado';
    responseDto.data = data;
  } catch (error) {
    responseDto.message = 'Error actualizando la enfermedad';
    responseDto.data = data;
  }

  return responseDto;
}
/**
* Sirve para agregar una enfermedad
* @param id 
* @returns 
*/
async getDisease(id: string) {
  let responseDto: ResponseDto = {
    response: false,
    data: '',
    message: '',
  };

  try {
    this.buildConection();
    const query = `SELECT * FROM public.enfermedad WHERE id = '${id}'`;
    let result = await this.dbProvider.useValue.query(query);

    if (result.rows.length > 0) {
      let row = result.rows[0];
      let desease: DiseaseDto = {
        id: row['id'],
        enfermedad: row['enfermedad'],
        descripcion_enfermedad: row['descripcion_enfermedad'],
        
      };

      responseDto.response = true;
      responseDto.message = '';
      responseDto.data = desease;
    } else {
      responseDto.message = 'La enfermedad no ha sido encontrado';
      let desease: DiseaseDto;
      responseDto.data = {
        id: '',
        enfermedad: '',
        descripcion_enfermedad: '',
      };
    }

    return responseDto;
  } catch (error) {
    responseDto.message = 'La enfermedad no ha sido encontrado';
    let desease: DiseaseDto;
    responseDto.data = desease;
    return responseDto;
  }
}
}
