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
  Fundacion,
} from '../models';
import {PeluditoRepository} from '../repositories';

export class PeluditoFundacionController {
  constructor(
    @repository(PeluditoRepository) protected peluditoRepository: PeluditoRepository,
  ) { }

  @get('/peluditos/{id}/fundacion', {
    responses: {
      '200': {
        description: 'Peludito has one Fundacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Fundacion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Fundacion>,
  ): Promise<Fundacion> {
    return this.peluditoRepository.fundacion(id).get(filter);
  }

  @post('/peluditos/{id}/fundacion', {
    responses: {
      '200': {
        description: 'Peludito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Fundacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Peludito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fundacion, {
            title: 'NewFundacionInPeludito',
            exclude: ['id'],
            optional: ['idFundacion']
          }),
        },
      },
    }) fundacion: Omit<Fundacion, 'id'>,
  ): Promise<Fundacion> {
    return this.peluditoRepository.fundacion(id).create(fundacion);
  }

  @patch('/peluditos/{id}/fundacion', {
    responses: {
      '200': {
        description: 'Peludito.Fundacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fundacion, {partial: true}),
        },
      },
    })
    fundacion: Partial<Fundacion>,
    @param.query.object('where', getWhereSchemaFor(Fundacion)) where?: Where<Fundacion>,
  ): Promise<Count> {
    return this.peluditoRepository.fundacion(id).patch(fundacion, where);
  }

  @del('/peluditos/{id}/fundacion', {
    responses: {
      '200': {
        description: 'Peludito.Fundacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Fundacion)) where?: Where<Fundacion>,
  ): Promise<Count> {
    return this.peluditoRepository.fundacion(id).delete(where);
  }
}
