import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Fundacion} from '../models';
import {FundacionRepository} from '../repositories';

export class FundacionController {
  constructor(
    @repository(FundacionRepository)
    public fundacionRepository : FundacionRepository,
  ) {}

  @post('/fundacions')
  @response(200, {
    description: 'Fundacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fundacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fundacion, {
            title: 'NewFundacion',
            exclude: ['id'],
          }),
        },
      },
    })
    fundacion: Omit<Fundacion, 'id'>,
  ): Promise<Fundacion> {
    return this.fundacionRepository.create(fundacion);
  }

  @get('/fundacions/count')
  @response(200, {
    description: 'Fundacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fundacion) where?: Where<Fundacion>,
  ): Promise<Count> {
    return this.fundacionRepository.count(where);
  }

  @get('/fundacions')
  @response(200, {
    description: 'Array of Fundacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fundacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fundacion) filter?: Filter<Fundacion>,
  ): Promise<Fundacion[]> {
    return this.fundacionRepository.find(filter);
  }

  @patch('/fundacions')
  @response(200, {
    description: 'Fundacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fundacion, {partial: true}),
        },
      },
    })
    fundacion: Fundacion,
    @param.where(Fundacion) where?: Where<Fundacion>,
  ): Promise<Count> {
    return this.fundacionRepository.updateAll(fundacion, where);
  }

  @get('/fundacions/{id}')
  @response(200, {
    description: 'Fundacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fundacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fundacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Fundacion>
  ): Promise<Fundacion> {
    return this.fundacionRepository.findById(id, filter);
  }

  @patch('/fundacions/{id}')
  @response(204, {
    description: 'Fundacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fundacion, {partial: true}),
        },
      },
    })
    fundacion: Fundacion,
  ): Promise<void> {
    await this.fundacionRepository.updateById(id, fundacion);
  }

  @put('/fundacions/{id}')
  @response(204, {
    description: 'Fundacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fundacion: Fundacion,
  ): Promise<void> {
    await this.fundacionRepository.replaceById(id, fundacion);
  }

  @del('/fundacions/{id}')
  @response(204, {
    description: 'Fundacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fundacionRepository.deleteById(id);
  }
}
