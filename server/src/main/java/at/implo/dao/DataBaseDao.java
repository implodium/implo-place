package at.implo.dao;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

public interface DataBaseDao<Identity, Entity> extends PanacheRepositoryBase<Entity, Identity> {

    default Entity save(Entity entity) {
        return getEntityManager().merge(entity);
    }
}
