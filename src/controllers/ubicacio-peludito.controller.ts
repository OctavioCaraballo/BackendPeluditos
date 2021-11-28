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
import {UbicacionPeludito} from '../models';
import {UbicacionPeluditoRepository} from '../repositories';

export class UbicacioPeluditoController {
  constructor(
    @repository(UbicacionPeluditoRepository)
    public ubicacionPeluditoRepository : UbicacionPeluditoRepository,
  ) {}

  @post('/ubicacion-peluditos')
  @response(200, {
    description: 'UbicacionPeludito model instance',
    content: {'application/json': {schema: getModelSchemaRef(UbicacionPeludito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionPeludito, {
            title: 'NewUbicacionPeludito',
            exclude: ['id'],
          }),
        },
      },
    })
    ubicacionPeludito: Omit<UbicacionPeludito, 'id'>,
  ): Promise<UbicacionPeludito> {
    return this.ubicacionPeluditoRepository.create(ubicacionPeludito);
  }

  @get('/ubicacion-peluditos/count')
  @response(200, {
    description: 'UbicacionPeludito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UbicacionPeludito) where?: Where<UbicacionPeludito>,
  ): Promise<Count> {
    return this.ubicacionPeluditoRepository.count(where);
  }

  @get('/ubicacion-peluditos')
  @response(200, {
    description: 'Array of UbicacionPeludito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UbicacionPeludito, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UbicacionPeludito) filter?: Filter<UbicacionPeludito>,
  ): Promise<UbicacionPeludito[]> {
    return this.ubicacionPeluditoRepository.find(filter);
  }

  @patch('/ubicacion-peluditos')
  @response(200, {
    description: 'UbicacionPeludito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionPeludito, {partial: true}),
        },
      },
    })
    ubicacionPeludito: UbicacionPeludito,
    @param.where(UbicacionPeludito) where?: Where<UbicacionPeludito>,
  ): Promise<Count> {
    return this.ubicacionPeluditoRepository.updateAll(ubicacionPeludito, where);
  }

  @get('/ubicacion-peluditos/{id}')
  @response(200, {
    description: 'UbicacionPeludito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UbicacionPeludito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UbicacionPeludito, {exclude: 'where'}) filter?: FilterExcludingWhere<UbicacionPeludito>
  ): Promise<UbicacionPeludito> {
    return this.ubicacionPeluditoRepository.findById(id, filter);
  }

  @patch('/ubicacion-peluditos/{id}')
  @response(204, {
    description: 'UbicacionPeludito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UbicacionPeludito, {partial: true}),
        },
      },
    })
    ubicacionPeludito: UbicacionPeludito,
  ): Promise<void> {
    await this.ubicacionPeluditoRepository.updateById(id, ubicacionPeludito);
  }

  @put('/ubicacion-peluditos/{id}')
  @response(204, {
    description: 'UbicacionPeludito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ubicacionPeludito: UbicacionPeludito,
  ): Promise<void> {
    await this.ubicacionPeluditoRepository.replaceById(id, ubicacionPeludito);
  }

  @del('/ubicacion-peluditos/{id}')
  @response(204, {
    description: 'UbicacionPeludito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ubicacionPeluditoRepository.deleteById(id);
  }
}
