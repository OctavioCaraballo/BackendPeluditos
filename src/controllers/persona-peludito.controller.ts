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
  Persona,
  Peludito,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPeluditoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Peludito',
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
    return this.personaRepository.peluditos(id).find(filter);
  }

  @post('/personas/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Peludito)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Peludito, {
            title: 'NewPeluditoInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) peludito: Omit<Peludito, 'id'>,
  ): Promise<Peludito> {
    return this.personaRepository.peluditos(id).create(peludito);
  }

  @patch('/personas/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Persona.Peludito PATCH success count',
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
    return this.personaRepository.peluditos(id).patch(peludito, where);
  }

  @del('/personas/{id}/peluditos', {
    responses: {
      '200': {
        description: 'Persona.Peludito DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Peludito)) where?: Where<Peludito>,
  ): Promise<Count> {
    return this.personaRepository.peluditos(id).delete(where);
  }
}
