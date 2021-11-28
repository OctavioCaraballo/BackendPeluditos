import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UbicacionPeludito, UbicacionPeluditoRelations, Peludito} from '../models';
import {PeluditoRepository} from './peludito.repository';

export class UbicacionPeluditoRepository extends DefaultCrudRepository<
  UbicacionPeludito,
  typeof UbicacionPeludito.prototype.id,
  UbicacionPeluditoRelations
> {

  public readonly peludito: HasOneRepositoryFactory<Peludito, typeof UbicacionPeludito.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PeluditoRepository') protected peluditoRepositoryGetter: Getter<PeluditoRepository>,
  ) {
    super(UbicacionPeludito, dataSource);
    this.peludito = this.createHasOneRepositoryFactoryFor('peludito', peluditoRepositoryGetter);
    this.registerInclusionResolver('peludito', this.peludito.inclusionResolver);
  }
}
