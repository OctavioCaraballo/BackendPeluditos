import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {UbicacionPeludito} from './ubicacion-peludito.model';
import {Fundacion} from './fundacion.model';

@model()
export class Peludito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoAnimal: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Persona)
  personaId: string;

  @property({
    type: 'string',
  })
  idPeludito?: string;

  @hasOne(() => UbicacionPeludito, {keyTo: 'idUbicacion'})
  ubicacionPeludito: UbicacionPeludito;

  @hasOne(() => Fundacion, {keyTo: 'idFundacion'})
  fundacion: Fundacion;

  constructor(data?: Partial<Peludito>) {
    super(data);
  }
}

export interface PeluditoRelations {
  // describe navigational properties here
}

export type PeluditoWithRelations = Peludito & PeluditoRelations;
