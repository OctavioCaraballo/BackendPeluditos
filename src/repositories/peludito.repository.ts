import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Peludito, PeluditoRelations, Persona, UbicacionPeludito, Fundacion} from '../models';
import {PersonaRepository} from './persona.repository';
import {UbicacionPeluditoRepository} from './ubicacion-peludito.repository';
import {FundacionRepository} from './fundacion.repository';

export class PeluditoRepository extends DefaultCrudRepository<
  Peludito,
  typeof Peludito.prototype.id,
  PeluditoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Peludito.prototype.id>;

  public readonly ubicacionPeludito: HasOneRepositoryFactory<UbicacionPeludito, typeof Peludito.prototype.id>;

  public readonly fundacion: HasOneRepositoryFactory<Fundacion, typeof Peludito.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('UbicacionPeluditoRepository') protected ubicacionPeluditoRepositoryGetter: Getter<UbicacionPeluditoRepository>, @repository.getter('FundacionRepository') protected fundacionRepositoryGetter: Getter<FundacionRepository>,
  ) {
    super(Peludito, dataSource);
    this.fundacion = this.createHasOneRepositoryFactoryFor('fundacion', fundacionRepositoryGetter);
    this.registerInclusionResolver('fundacion', this.fundacion.inclusionResolver);
    this.ubicacionPeludito = this.createHasOneRepositoryFactoryFor('ubicacionPeludito', ubicacionPeluditoRepositoryGetter);
    this.registerInclusionResolver('ubicacionPeludito', this.ubicacionPeludito.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
