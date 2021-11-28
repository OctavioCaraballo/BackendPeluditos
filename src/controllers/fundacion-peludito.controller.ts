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
  Fundacion,
  Peludito,
} from '../models';
import {FundacionRepository} from '../repositories';

export class FundacionPeluditoController {
  constructor(
    @repository(FundacionRepository) protected fundacionRepository: FundacionRepository,
  ) { }

  @get('/fundacions/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Array of Fundacion has many Peludito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Peludito)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Peludito>,
  ): Promise<Peludito[]> {
    return this.fundacionRepository.peluditos(id).find(filter);
  }

  @post('/fundacions/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Fundacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peludito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Fundacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {
            title: 'NewPeluditoInFundacion',
            exclude: ['id'],
            optional: ['idPeludito']
          }),
        },
      },
    }) peludito: Omit<Peludito, 'id'>,
  ): Promise<Peludito> {
    return this.fundacionRepository.peluditos(id).create(peludito);
  }

  @patch('/fundacions/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Fundacion.Peludito PATCH success count',
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
    return this.fundacionRepository.peluditos(id).patch(peludito, where);
  }

  @del('/fundacions/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Fundacion.Peludito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Peludito)) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.fundacionRepository.peluditos(id).delete(where);
  }
}
