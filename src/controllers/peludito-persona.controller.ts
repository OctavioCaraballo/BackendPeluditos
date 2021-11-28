import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Peludito,
  Persona,
} from '../models';
import {PeluditoRepository} from '../repositories';

export class PeluditoPersonaController {
  constructor(
    @repository(PeluditoRepository)
    public peluditoRepository: PeluditoRepository,
  ) { }

  @get('/peluditos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Peludito',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Peludito.prototype.id,
  ): Promise<Persona> {
    return this.peluditoRepository.persona(id);
  }
}
