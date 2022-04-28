package at.implo.dao;

import at.implo.entity.Cooldown;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.NormalScope;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CooldownDao implements DataBaseDao<Long, Cooldown> {

    public Optional<Cooldown> findCooldownByUserId(String id) throws NoResultException {
        val query = getEntityManager().createQuery(
                "select cooldown from Cooldown cooldown where cooldown.user.id = :userId",
                Cooldown.class
        );

        query.setParameter("userId", id);

        try {
            return Optional.of(query.getSingleResult());
        } catch (NoResultException exception) {
            return Optional.empty();
        }
    }

    public List<Cooldown> loadCooldowns() {
        return listAll();
    }
}
