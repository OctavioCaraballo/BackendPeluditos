import {Entity, model, property, hasOne} from '@loopback/repository';
import {Peludito} from './peludito.model';

@model()
export class UbicacionPeludito extends Entity {
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
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  localidad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @hasOne(() => Peludito, {keyTo: 'idPeludito'})
  peludito: Peludito;

  @property({
    type: 'string',
  })
  idUbicacion?: string;

  constructor(data?: Partial<UbicacionPeludito>) {
    super(data);
  }
}

export interface UbicacionPeluditoRelations {
  // describe navigational properties here
}

export type UbicacionPeluditoWithRelations = UbicacionPeludito & UbicacionPeluditoRelations;
