import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  UbicacionPeludito,
  Peludito,
} from '../models';
import {UbicacionPeluditoRepository} from '../repositories';

export class UbicacionPeluditoPeluditoController {
  constructor(
    @repository(UbicacionPeluditoRepository) protected ubicacionPeluditoRepository: UbicacionPeluditoRepository,
  ) { }

  @get('/ubicacion-peluditos/{id}/peludito', {
    responses: {
      '200': {
        description: 'UbicacionPeludito has one Peludito',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Peludito),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Peludito>,
  ): Promise<Peludito> {
    return this.ubicacionPeluditoRepository.peludito(id).get(filter);
  }

  @post('/ubicacion-peluditos/{id}/peludito', {
    responses: {
      '200': {
        description: 'UbicacionPeludito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peludito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UbicacionPeludito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {
            title: 'NewPeluditoInUbicacionPeludito',
            exclude: ['id'],
            optional: ['idPeludito']
          }),
        },
      },
    }) peludito: Omit<Peludito, 'id'>,
  ): Promise<Peludito> {
    return this.ubicacionPeluditoRepository.peludito(id).create(peludito);
  }

  @patch('/ubicacion-peluditos/{id}/peludito', {
    responses: {
      '200': {
        description: 'UbicacionPeludito.Peludito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {partial: true}),
        },
      },
    })
    peludito: Partial<Peludito>,
    @param.query.object('where', getWhereSchemaFor(Peludito)) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.ubicacionPeluditoRepository.peludito(id).patch(peludito, where);
  }

  @del('/ubicacion-peluditos/{id}/peludito', {
    responses: {
      '200': {
        description: 'UbicacionPeludito.Peludito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Peludito)) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.ubicacionPeluditoRepository.peludito(id).delete(where);
  }
}
