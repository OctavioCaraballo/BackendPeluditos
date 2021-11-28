import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Peludito} from '../models';
import {PeluditoRepository} from './peludito.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly peluditos: HasManyRepositoryFactory<Peludito, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PeluditoRepository') protected peluditoRepositoryGetter: Getter<PeluditoRepository>,
  ) {
    super(Persona, dataSource);
    this.peluditos = this.createHasManyRepositoryFactoryFor('peluditos', peluditoRepositoryGetter,);
    this.registerInclusionResolver('peluditos', this.peluditos.inclusionResolver);
  }
}
