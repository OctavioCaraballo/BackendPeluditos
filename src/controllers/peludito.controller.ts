import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Peludito} from '../models';
import {PeluditoRepository} from '../repositories';

@authenticate('admin')
export class PeluditoController {
  constructor(
    @repository(PeluditoRepository)
    public peluditoRepository: PeluditoRepository,
  ) { }

  @post('/peluditos')
  @response(200, {
    description: 'Peludito model instance',
    content: {'application/json': {schema: getModelSchemaRef(Peludito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {
            title: 'NewPeludito',
            exclude: ['id'],
          }),
        },
      },
    })
    peludito: Omit<Peludito, 'id'>,
  ): Promise<Peludito> {
    return this.peluditoRepository.create(peludito);
  }

  @authenticate.skip()
  @get('/peluditos/count')
  @response(200, {
    description: 'Peludito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Peludito) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.peluditoRepository.count(where);
  }

  @get('/peluditos')
  @response(200, {
    description: 'Array of Peludito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Peludito, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Peludito) filter?: Filter<Peludito>,
  ): Promise<Peludito[]> {
    return this.peluditoRepository.find(filter);
  }

  @patch('/peluditos')
  @response(200, {
    description: 'Peludito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {partial: true}),
        },
      },
    })
    peludito: Peludito,
    @param.where(Peludito) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.peluditoRepository.updateAll(peludito, where);
  }

  @get('/peluditos/{id}')
  @response(200, {
    description: 'Peludito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Peludito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Peludito, {exclude: 'where'}) filter?: FilterExcludingWhere<Peludito>
  ): Promise<Peludito> {
    return this.peluditoRepository.findById(id, filter);
  }

  @patch('/peluditos/{id}')
  @response(204, {
    description: 'Peludito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {partial: true}),
        },
      },
    })
    peludito: Peludito,
  ): Promise<void> {
    await this.peluditoRepository.updateById(id, peludito);
  }

  @put('/peluditos/{id}')
  @response(204, {
    description: 'Peludito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() peludito: Peludito,
  ): Promise<void> {
    await this.peluditoRepository.replaceById(id, peludito);
  }

  @del('/peluditos/{id}')
  @response(204, {
    description: 'Peludito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.peluditoRepository.deleteById(id);
  }
}
