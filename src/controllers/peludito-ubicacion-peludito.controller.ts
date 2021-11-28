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
  Peludito,
  UbicacionPeludito,
} from '../models';
import {PeluditoRepository} from '../repositories';

export class PeluditoUbicacionPeluditoController {
  constructor(
    @repository(PeluditoRepository) protected peluditoRepository: PeluditoRepository,
  ) { }

  @get('/peluditos/{id}/ubicacion-peludito', {
    responses: {
      '200': {
        description: 'Peludito has one UbicacionPeludito',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UbicacionPeludito),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UbicacionPeludito>,
  ): Promise<UbicacionPeludito> {
    return this.peluditoRepository.ubicacionPeludito(id).get(filter);
  }

  @post('/peluditos/{id}/ubicacion-peludito', {
    responses: {
      '200': {
        description: 'Peludito model instance',
        content: {'application/json': {schema: getModelSchemaRef(UbicacionPeludito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Peludito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionPeludito, {
            title: 'NewUbicacionPeluditoInPeludito',
            exclude: ['id'],
            optional: ['idUbicacion']
          }),
        },
      },
    }) ubicacionPeludito: Omit<UbicacionPeludito, 'id'>,
  ): Promise<UbicacionPeludito> {
    return this.peluditoRepository.ubicacionPeludito(id).create(ubicacionPeludito);
  }

  @patch('/peluditos/{id}/ubicacion-peludito', {
    responses: {
      '200': {
        description: 'Peludito.UbicacionPeludito PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionPeludito, {partial: true}),
        },
      },
    })
    ubicacionPeludito: Partial<UbicacionPeludito>,
    @param.query.object('where', getWhereSchemaFor(UbicacionPeludito)) where?: Where<UbicacionPeludito>,
  ): Promise<Count> {
    return this.peluditoRepository.ubicacionPeludito(id).patch(ubicacionPeludito, where);
  }

  @del('/peluditos/{id}/ubicacion-peludito', {
    responses: {
      '200': {
        description: 'Peludito.UbicacionPeludito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UbicacionPeludito)) where?: Where<UbicacionPeludito>,
  ): Promise<Count> {
    return this.peluditoRepository.ubicacionPeludito(id).delete(where);
  }
}
