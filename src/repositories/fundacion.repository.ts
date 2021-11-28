import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Fundacion, FundacionRelations, Peludito} from '../models';
import {PeluditoRepository} from './peludito.repository';

export class FundacionRepository extends DefaultCrudRepository<
  Fundacion,
  typeof Fundacion.prototype.id,
  FundacionRelations
> {

  public readonly peluditos: HasManyRepositoryFactory<Peludito, typeof Fundacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PeluditoRepository') protected peluditoRepositoryGetter: Getter<PeluditoRepository>,
  ) {
    super(Fundacion, dataSource);
    this.peluditos = this.createHasManyRepositoryFactoryFor('peluditos', peluditoRepositoryGetter,);
    this.registerInclusionResolver('peluditos', this.peluditos.inclusionResolver);
  }
}
