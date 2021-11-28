import {Entity, model, property, hasMany} from '@loopback/repository';
import {Peludito} from './peludito.model';

@model()
export class Fundacion extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  paginaWeb?: string;

  @property({
    type: 'string',
  })
  idFundacion?: string;

  @hasMany(() => Peludito, {keyTo: 'idPeludito'})
  peluditos: Peludito[];

  constructor(data?: Partial<Fundacion>) {
    super(data);
  }
}

export interface FundacionRelations {
  // describe navigational properties here
}

export type FundacionWithRelations = Fundacion & FundacionRelations;
