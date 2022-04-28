package at.implo.control;

import at.implo.dao.CooldownDao;
import at.implo.dao.UserDao;
import at.implo.entity.Cooldown;
import at.implo.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.scheduler.Scheduled;
import lombok.Getter;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CooldownController {


    private final int defaultMinutes = 5;
    private final int defaultSeconds = 5;

    @Getter
    private List<Cooldown> cooldowns = new ArrayList<>();

    @Inject CooldownDao dao;

    @Inject UserDao userDao;

    @Inject
    DiscordController discordController;

    void init(@Observes StartupEvent event) {
        this.cooldowns = dao.loadCooldowns();
    }

    public Cooldown setCooldown(User user) {
        val cooldown = user.getCooldown();
        cooldown.activate(defaultMinutes, defaultSeconds);
        cooldowns.add(cooldown);
        return dao.save(cooldown);
    }

    @Scheduled(every = "10s")
    public void persist() {
        cooldowns.forEach(this.dao::save);
    }

    @Scheduled(every = "1s")
    public void decrement() {
        cooldowns.forEach(Cooldown::decrement);
    }

    public Cooldown getCooldownObjectOrCreateWith(String token) {
        val userResponse = discordController.getUserByToken(token);
        return findCooldownByUserId(userResponse.id());
    }

    private Cooldown findCooldownByUserId(String id) {
        return findLoadedByUserId(id)
                .or(() -> getFromDatabaseAndLoadIfPresent(id))
                .orElse(new Cooldown(userDao.findById(id)));
    }

    private Optional<Cooldown> getFromDatabaseAndLoadIfPresent(String userId) {
        val cooldown = dao.findCooldownByUserId(userId);
        cooldown.ifPresent(value -> cooldowns.add(value));
        return cooldown;
    }

    private Optional<Cooldown> findLoadedByUserId(String id) {
        return cooldowns.stream()
                .filter(cooldown -> cooldown
                    .getUser()
                    .getId()
                    .equals(id))
                .findFirst();
    }
}
